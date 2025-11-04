-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 04, 2025 at 03:20 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dentafile_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `service` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `service`, `date`, `time`) VALUES
(1, 5, 'Filling', '2025-10-28', '21:56:00'),
(2, 3, 'Filling', '2025-10-28', '21:57:00'),
(3, 5, 'Filling', '2025-10-28', '22:06:00'),
(4, 7, 'Filling', '2025-10-28', '23:22:00'),
(5, 5, 'Extraction', '2025-10-28', '23:26:00'),
(6, 1, 'Cleaning', '2025-10-29', '00:12:00'),
(7, 2, 'Cleaning', '2025-10-29', '00:24:00'),
(8, 8, 'Brace Adjustment', '2025-10-29', '00:26:00'),
(9, 9, 'Root Canal', '2025-10-29', '00:57:00'),
(10, 2, 'Root Canal', '2025-10-29', '15:09:00'),
(11, 10, 'Brace Adjustment', '2025-10-29', '16:02:00'),
(12, 1, 'Cleaning', '2025-10-29', '18:02:00'),
(13, 9, 'Extraction', '2025-10-30', '13:50:00');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `doctor` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birthday` date NOT NULL,
  `country` varchar(50) DEFAULT 'Philippines',
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `medical_history` text DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `doctor`, `name`, `surname`, `gender`, `age`, `birthday`, `country`, `email`, `phone`, `city`, `medical_history`, `remarks`, `created_at`) VALUES
(1, 'Dr Quisaot', 'Benedict ', 'Dimalanta', 'Male', 21, '2000-01-17', 'Philippines', 'solo@gmail.com', '09293938508', 'Isulan', 'N/A', 'Good', '2025-10-25 16:31:26'),
(2, 'Dr Quisaot', 'Oliver', 'Orano', 'Male', 24, '2002-07-16', 'Philippines', 'oliver@gmail.com', '09933454565', 'Digos', 'Autistic', 'N/A', '2025-10-25 16:33:22'),
(3, 'Dr Quisaot', 'Michael', 'Quisaot', 'Female', 23, '2002-05-16', 'Philippines', 'mj@gmail.com', '09101010101', 'Tandag', 'ADHD', 'Bad', '2025-10-25 16:47:47'),
(5, 'Dr Quisaot', 'Kent', 'Monteza', 'Male', 22, '2003-04-16', 'Philippines', 'kent@gmail.com', '09626054547', 'Tarragona', 'N/A', 'Good', '2025-10-28 12:33:07'),
(7, 'Dr Quisaot', 'Dave', 'Aguelo', 'Male', 21, '2004-10-27', 'Philippines', 'dave@gmail.com', '09234567689', 'Davao', 'N/A', 'braces', '2025-10-28 14:40:32'),
(8, 'Dr Quisaot', 'Cyrus', 'Yleana', 'Male', 23, '2002-05-22', 'Philippines', 'cyrus@gmail.com', '09234576521', 'Cotabato', 'Aids', 'need to check', '2025-10-28 16:26:08'),
(9, 'Dr Quisaot', 'James', 'Espino', 'Male', 21, '2004-03-24', 'Philippines', 'james@gmail.com', '09786543454', 'Tacurong', 'N/A', 'Needs cleaning', '2025-10-28 16:57:24'),
(10, 'Dr Quisaot', 'Kerk', 'Bangcaya', 'Male', 21, '2004-03-03', 'Philippines', 'kerk@gmail.com', '097865454324', 'Tacurong', 'None', 'needs checking', '2025-10-29 08:02:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role` enum('Dentist','Admin','Staff') NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `phone`, `role`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Benedict Solo Dimalanta', 'solo@gmail.com', '09293938508', 'Dentist', '$2y$10$MetIWic3njN/nunrv246a.9Z2fDL9KB1cthwBO/HsjqxFVzFj5O6C', '2025-10-24 15:08:38', '2025-10-28 16:53:54'),
(2, 'Oliver Orano', 'oliver@gmail.com', '09933454565', 'Admin', '$2y$10$i4JtVmbayB.5eVuIIEmTdOYQlpwbpim731H7S3XIIiyJ626QXkhYe', '2025-10-24 15:13:09', '2025-10-24 15:13:09'),
(3, 'Michael John Quisaot', 'mj@gmail.com', '09101010109', 'Staff', '$2y$10$8YaefZQkAioBpRi3KSR0DO3IBBsqZ6olrNqP.3ZY/wIxJEu02.Ipy', '2025-10-24 15:58:11', '2025-10-28 16:47:23'),
(4, 'Kent Clyde Monteza', 'kent@gmail.com', '09626054547', 'Admin', '$2y$10$rWqMqe3OTBVkVoeglmkWg.CS8mOj1FuXP/Ir6IjRDHz5doWYME.R.', '2025-10-27 17:07:34', '2025-10-27 17:07:34'),
(5, 'James Espino', 'james@gmail.com', '09876543425', 'Admin', '$2y$10$gPID9QlrzE5UCUyfnO2LO.dYyV1m0CX8KoVSTYdsohRXiEQjK2bdG', '2025-10-28 16:55:54', '2025-10-28 16:55:54'),
(6, 'Carl Paclibar', 'carl@gmail.com', '09625468790', 'Staff', '$2y$10$yMob/Z6vTH4G9824ZkNpmebbx6otOXnZPeLllCzSTCa9La4Ws/5kW', '2025-10-30 05:48:28', '2025-10-30 05:51:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
