<?php
error_reporting(0);
ini_set('display_errors', 0);
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "dentafile_db");
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'DB connection failed']);
    exit;
}

// Get POST data safely
$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$surname = isset($_POST['surname']) ? trim($_POST['surname']) : '';
$age = isset($_POST['age']) ? intval($_POST['age']) : 0;
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$doctor = isset($_POST['doctor']) ? trim($_POST['doctor']) : '';

if ($id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid ID']);
    exit;
}

$stmt = $conn->prepare("UPDATE patients SET name=?, surname=?, age=?, phone=?, doctor=? WHERE id=?");
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Prepare statement failed']);
    exit;
}

$stmt->bind_param("ssissi", $name, $surname, $age, $phone, $doctor, $id);
$success = $stmt->execute();

$stmt->close();
$conn->close();

echo json_encode(['success' => $success]);
