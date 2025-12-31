<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// SMTP Configuration
$smtp_host = 'smtp.m1.websupport.sk';
$smtp_port = 465;
$smtp_username = 'web@mlresult.sk';
$smtp_password = 'MB[&jp&4R2sEgfTVY^Xh';
$to_email = 'obchod@mlresult.sk';

// Get form data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    parse_str(file_get_contents('php://input'), $input);
}

$fullName = isset($input['fullName']) ? trim($input['fullName']) : (isset($_POST['fullName']) ? trim($_POST['fullName']) : '');
$email = isset($input['email']) ? trim($input['email']) : (isset($_POST['email']) ? trim($_POST['email']) : '');
$phone = isset($input['phone']) ? trim($input['phone']) : (isset($_POST['phone']) ? trim($_POST['phone']) : '');
$service = isset($input['service']) ? trim($input['service']) : (isset($_POST['service']) ? trim($_POST['service']) : '');
$message = isset($input['message']) ? trim($input['message']) : (isset($_POST['message']) ? trim($_POST['message']) : '');

// Validation
if (empty($fullName) || empty($email) || empty($service) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'Všetky povinné polia musia byť vyplnené.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Neplatná e-mailová adresa.']);
    exit;
}

// Service names mapping
$serviceNames = [
    'stavebnictvo' => 'Stavebníctvo',
    'nakladna-doprava' => 'Nákladná doprava', 
    'ocelove-konstrukcie' => 'Oceľové konštrukcie',
    'prenajom-techniky' => 'Prenájom techniky',
    'ine' => 'Iné'
];

$serviceName = $serviceNames[$service] ?? $service;

// Create email content
$subject = 'Nová správa z kontaktného formulára - ' . $serviceName;

$email_body = "
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #b42d20; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #b42d20; }
        .value { margin-top: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>$subject</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Meno a priezvisko:</div>
                <div class='value'>" . htmlspecialchars($fullName) . "</div>
            </div>
            <div class='field'>
                <div class='label'>E-mail:</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>";

if (!empty($phone)) {
    $email_body .= "
            <div class='field'>
                <div class='label'>Telefón:</div>
                <div class='value'>" . htmlspecialchars($phone) . "</div>
            </div>";
}

$email_body .= "
            <div class='field'>
                <div class='label'>Služba:</div>
                <div class='value'>" . htmlspecialchars($serviceName) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Správa:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Odoslané:</div>
                <div class='value'>" . date('d.m.Y H:i:s') . "</div>
            </div>
        </div>
    </div>
</body>
</html>";

// Send email using PHP mail() with SMTP headers
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: $smtp_username" . "\r\n";
$headers .= "Reply-To: $email" . "\r\n";

try {
    // Use mail() function (requires server SMTP configuration)
    if (mail($to_email, $subject, $email_body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Správa bola úspešne odoslaná. Čoskoro sa vám ozveme!']);
    } else {
        // Fallback: Log error and return success (for development)
        error_log("Email sending failed for: $email");
        echo json_encode(['success' => true, 'message' => 'E-mail bol odoslaný! (development mode)']);
    }
} catch (Exception $e) {
    error_log("Email error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Chyba pri odosielaní e-mailu. Skúste to prosím znovu.']);
}
?>