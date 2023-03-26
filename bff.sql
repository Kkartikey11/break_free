-- Database name - break_free

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) not null,
  `description` varchar(200) default '',
  `is_deleted` int default 0 ,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) not null,
  `about` varchar(200) default '',
  `email` varchar(200) not null,
  `password` varchar(200) not null,
  `mobile` varchar(200),
  `role_id` int not null,
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
);

CREATE TABLE `grades` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) not null,
  `description` varchar(200) default '',
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE `subjects` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) not null,
  `description` varchar(200) default '',
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE `students` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) not null,
  `about` varchar(200) default '',
  `email` varchar(200),
  `mobile` varchar(200),
  `grade_id` int,
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`)
);

CREATE TABLE `batches` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) not null,
  `description` varchar(200) default '',
  `grade_id` int,
  `subject_id` int,
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`),
  FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
);

CREATE TABLE `batch_students_mapping` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `batch_id` int,
  `student_id` int,
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (`batch_id`) REFERENCES `batches` (`id`),
  FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
);

CREATE TABLE `events` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) not null,
  `description` varchar(200) default '',
  `batch_id` int not null,
  `event_datetime` timestamp not null,
  `has_report` int default 0,
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (`batch_id`) REFERENCES `batches` (`id`)
);

CREATE TABLE `event_teachers_mapping` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int not null,
  `event_id` int not null,
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
);

CREATE TABLE `event_performance` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `event_id` int not null,
  `performance_json` text,
  `is_deleted` int default 0,
  `created_at` timestamp default current_timestamp,
  `updated_at` timestamp default current_timestamp on update current_timestamp,
  FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  FOREIGN KEY (`event_id`) REFERENCES `events` (`id`)
);
