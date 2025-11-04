<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not logged in"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$fullname = $data['fullname'] ?? '';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$role = $data['role'] ?? '';

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dentafile_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("UPDATE users SET fullname = ?, email = ?, phone = ?, role = ? WHERE id = ?");
$stmt->bind_param("ssssi", $fullname, $email, $phone, $role, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update profile"]);
}

$stmt->close();
$conn->close();
?>
