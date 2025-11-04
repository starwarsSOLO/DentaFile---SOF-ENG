<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$db   = "dentafile_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : "";

if ($search !== "") {
    $sql = "SELECT * FROM patients WHERE name LIKE '%$search%' OR surname LIKE '%$search%' ORDER BY id DESC";
} else {
    $sql = "SELECT * FROM patients ORDER BY id DESC";
}

$result = $conn->query($sql);
$patients = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
}

echo json_encode(['success' => true, 'patients' => $patients]);
$conn->close();
?>
