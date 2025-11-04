<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$db   = "dentafile_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

// Get date from GET request, default to today
$date = isset($_GET['date']) ? trim($_GET['date']) : date("Y-m-d");
if (!preg_match("/^\d{4}-\d{2}-\d{2}$/", $date)) {
    $date = date("Y-m-d");
}

// Optional: Only show future appointments if the date is today
$timeNow = date("H:i:s");
if ($date === date("Y-m-d")) {
    $sql = "SELECT a.id, p.name, p.surname, a.service, a.time, a.date
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            WHERE a.date = ? AND a.time >= ?
            ORDER BY a.time ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $date, $timeNow);
} else {
    $sql = "SELECT a.id, p.name, p.surname, a.service, a.time, a.date
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            WHERE a.date = ?
            ORDER BY a.time ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $date);
}

$stmt->execute();
$result = $stmt->get_result();

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = [
        "name"    => $row['name'] . " " . $row['surname'],
        "service" => $row['service'],
        "time"    => $row['time'], // JS will format to 12-hour
        "date"    => $row['date']  // JS will format
    ];
}

echo json_encode($appointments);

$stmt->close();
$conn->close();
