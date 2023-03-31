-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 29, 2023 at 05:16 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `break_free`
--

-- --------------------------------------------------------

--
-- Table structure for table `batches`
--

CREATE TABLE `batches` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT '',
  `grade_id` int(11) DEFAULT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `batches`
--

INSERT INTO `batches` (`id`, `name`, `description`, `grade_id`, `subject_id`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Morning-Math', '', NULL, 1, 0, '2023-03-25 21:03:47', '2023-03-25 21:03:47'),
(2, 'Evening-Math', '', NULL, 1, 0, '2023-03-25 21:11:55', '2023-03-25 21:11:55'),
(3, 'Evening-Math', '', NULL, 1, 0, '2023-03-25 21:13:44', '2023-03-25 21:13:44'),
(4, 'Evening-Math', '', NULL, 1, 0, '2023-03-25 21:14:34', '2023-03-25 21:14:34'),
(5, 'Evening-Math', '', NULL, 1, 0, '2023-03-25 21:19:17', '2023-03-25 21:19:17'),
(6, 'Evening-Math', '', NULL, 1, 0, '2023-03-26 04:05:31', '2023-03-26 04:05:31'),
(7, 'Evening-Math', '', NULL, 1, 0, '2023-03-26 04:05:53', '2023-03-26 04:05:53');

-- --------------------------------------------------------

--
-- Table structure for table `batch_students_mapping`
--

CREATE TABLE `batch_students_mapping` (
  `id` int(11) NOT NULL,
  `batch_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `batch_students_mapping`
--

INSERT INTO `batch_students_mapping` (`id`, `batch_id`, `student_id`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 5, 1, 0, '2023-03-25 21:19:17', '2023-03-25 21:19:17'),
(2, 6, 1, 0, '2023-03-26 04:05:32', '2023-03-26 04:05:32'),
(3, 7, 1, 0, '2023-03-26 04:05:53', '2023-03-26 04:05:53');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT '',
  `batch_id` int(11) NOT NULL,
  `event_datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `has_report` int(11) DEFAULT 0,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `batch_id`, `event_datetime`, `has_report`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Event -1', 'This is first event', 7, '2023-03-27 09:01:00', 0, 0, '2023-03-26 04:30:10', '2023-03-26 04:30:10'),
(2, 'Event -1', 'This is first event', 7, '2023-03-27 09:01:00', 0, 0, '2023-03-26 04:32:49', '2023-03-26 04:32:49'),
(3, 'Event -1', 'This is first event', 7, '2023-03-27 09:01:00', 0, 0, '2023-03-26 04:33:23', '2023-03-26 04:33:23'),
(4, 'Event -1', 'This is first event', 7, '2023-03-27 09:01:00', 0, 0, '2023-03-26 04:34:35', '2023-03-26 04:34:35'),
(5, 'Event -1', 'This is first event', 7, '2023-03-27 09:01:00', 0, 0, '2023-03-26 04:35:21', '2023-03-26 04:35:21'),
(6, 'Event -1', 'This is first event', 7, '2023-03-27 09:01:00', 0, 0, '2023-03-26 04:35:40', '2023-03-26 04:35:40'),
(7, 'Event -1', 'This is first event', 7, '2023-03-27 09:01:00', 0, 0, '2023-03-26 04:36:04', '2023-03-26 04:36:04'),
(8, 'Event -1', 'This is first event', 7, '2023-03-27 09:01:00', 0, 0, '2023-03-26 04:59:30', '2023-03-26 04:59:30');

-- --------------------------------------------------------

--
-- Table structure for table `event_performance`
--

CREATE TABLE `event_performance` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `performance_json` text DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_performance`
--

INSERT INTO `event_performance` (`id`, `event_id`, `performance_json`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 8, '[{\"student_id\":1,\"attend\":1}]', 0, '2023-03-26 05:50:23', '2023-03-26 05:50:23');

-- --------------------------------------------------------

--
-- Table structure for table `event_teachers_mapping`
--

CREATE TABLE `event_teachers_mapping` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event_teachers_mapping`
--

INSERT INTO `event_teachers_mapping` (`id`, `user_id`, `event_id`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 7, 0, '2023-03-26 04:36:04', '2023-03-26 04:36:04'),
(2, 1, 8, 0, '2023-03-26 04:59:30', '2023-03-26 04:59:30');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT '',
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `name`, `description`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, '6', '', 0, '2023-03-25 19:09:29', '2023-03-25 19:09:29'),
(2, '7', '', 0, '2023-03-25 19:11:19', '2023-03-25 19:11:19'),
(3, '8', '', 0, '2023-03-25 19:11:31', '2023-03-25 19:11:31'),
(4, '9', '', 0, '2023-03-25 19:11:36', '2023-03-25 19:11:36'),
(5, '10', '', 0, '2023-03-25 19:11:40', '2023-03-25 19:11:40'),
(6, '11', '', 0, '2023-03-25 19:11:44', '2023-03-25 19:11:44'),
(7, '12', '', 0, '2023-03-25 19:11:48', '2023-03-25 19:11:48'),
(8, '12', '', 0, '2023-03-25 20:00:42', '2023-03-25 20:00:42'),
(9, '12', '', 0, '2023-03-25 20:01:23', '2023-03-25 20:01:23'),
(10, '12', '', 0, '2023-03-25 20:01:25', '2023-03-25 20:01:25'),
(11, '12', '', 0, '2023-03-25 20:01:53', '2023-03-25 20:01:53'),
(12, '12', '', 0, '2023-03-25 20:03:17', '2023-03-25 20:03:17'),
(13, '12', '', 0, '2023-03-25 20:03:39', '2023-03-25 20:03:39');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT '',
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', '', 0, '2023-03-25 13:20:32', '2023-03-25 13:20:32'),
(2, 'Super Admin', '', 0, '2023-03-25 13:20:35', '2023-03-25 13:20:35'),
(3, 'Admin', '', 0, '2023-03-25 20:06:41', '2023-03-25 20:06:41'),
(4, 'mentor', '', 0, '2023-03-25 20:07:19', '2023-03-25 20:07:19');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `about` varchar(200) DEFAULT '',
  `email` varchar(200) DEFAULT NULL,
  `mobile` varchar(200) DEFAULT NULL,
  `grade_id` int(11) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `about`, `email`, `mobile`, `grade_id`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Akil', '', 'akil@gmail.com', NULL, 1, 0, '2023-03-25 20:28:30', '2023-03-25 20:28:30'),
(2, 'Akshay', '', 'akil@gmail.com', NULL, 2, 0, '2023-03-25 20:33:43', '2023-03-25 20:33:43');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) DEFAULT '',
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `description`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Math', '', 0, '2023-03-25 20:43:24', '2023-03-25 20:43:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `about` varchar(200) DEFAULT '',
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `mobile` varchar(200) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `is_deleted` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `about`, `email`, `password`, `mobile`, `role_id`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Test', '', '', '', NULL, 1, 0, '2023-03-25 13:21:01', '2023-03-25 13:21:01'),
(2, 'Test', '', '', '', NULL, 1, 0, '2023-03-25 13:21:04', '2023-03-25 13:21:04'),
(4, 'kartikey Kumar', '', 'k2kartikey.pathak@gmail.com', 'U2FsdGVkX1/NIW9l5W2oDTJsmuqxAQYfm8ymjzioHHg=', NULL, 1, 0, '2023-03-26 09:28:00', '2023-03-26 09:28:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batches`
--
ALTER TABLE `batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `batch_students_mapping`
--
ALTER TABLE `batch_students_mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_performance`
--
ALTER TABLE `event_performance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_teachers_mapping`
--
ALTER TABLE `event_teachers_mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `batches`
--
ALTER TABLE `batches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `batch_students_mapping`
--
ALTER TABLE `batch_students_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `event_performance`
--
ALTER TABLE `event_performance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `event_teachers_mapping`
--
ALTER TABLE `event_teachers_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `batch_students_mapping`
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
