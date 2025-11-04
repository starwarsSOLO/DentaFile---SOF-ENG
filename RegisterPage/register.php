<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Only POST method allowed"]);
    exit;
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dentafile_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

// Get POST values safely
function getPost($key) {
    return isset($_POST[$key]) ? trim($_POST[$key]) : '';
}

$fullname = getPost('fullname');
$email = getPost('email');
$phone = getPost('phone');
$role = getPost('role');
$password = getPost('password');
$confirm_password = getPost('confirm_password');

// Check for missing fields
$missing = [];
foreach (['fullname','email','phone','role','password','confirm_password'] as $field) {
    if (empty($$field)) $missing[] = $field;
}
if ($missing) {
    echo json_encode([
        "success" => false,
        "message" => "Missing fields: " . implode(', ', $missing),
        "received_data" => $_POST
    ]);
    exit;
}

// Email & password validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email"]);
    exit;
}
if ($password !== $confirm_password) {
    echo json_encode(["success" => false, "message" => "Passwords do not match"]);
    exit;
}
if (strlen($password) < 6) {
    echo json_encode(["success" => false, "message" => "Password must be at least 6 characters"]);
    exit;
}

// Role check
$allowed_roles = ['Dentist','Admin','Staff'];
if (!in_array($role, $allowed_roles)) {
    echo json_encode(["success" => false, "message" => "Invalid role"]);
    exit;
}

// Check duplicate email
$stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
$stmt->bind_param("s",$email);
$stmt->execute();
$res = $stmt->get_result();
if ($res->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Email already exists"]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Insert user
$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (fullname,email,phone,role,password) VALUES (?,?,?,?,?)");
$stmt->bind_param("sssss", $fullname, $email, $phone, $role, $hashed);

if ($stmt->execute()) {
    $_SESSION['user_id'] = $conn->insert_id;
    $_SESSION['fullname'] = $fullname;
    $_SESSION['email'] = $email;
    $_SESSION['phone'] = $phone;
    $_SESSION['role'] = $role;

    echo json_encode([
        "success" => true,
        "message" => "Registration successful! Welcome to DentaFile.",
        "data" => compact('fullname','email','phone','role')
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Registration failed"]);
}

$stmt->close();
$conn->close();
?>
