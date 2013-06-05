-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2013 at 08:01 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sigma_local`
--

-- --------------------------------------------------------

--
-- Table structure for table `sigma_blog`
--

CREATE TABLE IF NOT EXISTS `sigma_blog` (
  `blog_id` int(11) NOT NULL,
  `blog_user_id` varchar(45) DEFAULT NULL,
  `blog_title` varchar(45) DEFAULT NULL,
  `blog_content` text,
  PRIMARY KEY (`blog_id`),
  KEY `author_user_idx` (`blog_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sigma_competition`
--

CREATE TABLE IF NOT EXISTS `sigma_competition` (
  `competition_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_title` varchar(45) NOT NULL,
  `competition_description` varchar(255) DEFAULT NULL,
  `competition_creater` int(11) DEFAULT NULL,
  `competition_type` int(1) DEFAULT '0',
  `competition_create_time` datetime DEFAULT NULL,
  `competition_start_time` datetime DEFAULT NULL,
  `competition_end_time` datetime DEFAULT NULL,
  `competition_stauts` int(1) DEFAULT '0',
  PRIMARY KEY (`competition_id`),
  KEY `creater_user_idx` (`competition_creater`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `sigma_competition_submit`
--

CREATE TABLE IF NOT EXISTS `sigma_competition_submit` (
  `competition_submit_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_submit_user_id` int(11) DEFAULT NULL,
  `competition_submit_status` int(1) NOT NULL,
  `competition_submit_problem_id` int(11) NOT NULL,
  `competition_submit_time` datetime NOT NULL,
  PRIMARY KEY (`competition_submit_id`),
  KEY `submit_user_idx` (`competition_submit_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `sigma_message`
--

CREATE TABLE IF NOT EXISTS `sigma_message` (
  `message_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_sender` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `message_reciever` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `message_content` text COLLATE utf8_unicode_ci,
  `message_time` datetime DEFAULT NULL,
  `messsage_type` int(1) NOT NULL DEFAULT '0',
  `message_color` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `message_is_secret` enum('y','n') COLLATE utf8_unicode_ci DEFAULT NULL,
  `message_is_kick` enum('y','n') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=102 ;

--
-- Dumping data for table `sigma_message`
--

INSERT INTO `sigma_message` (`message_id`, `message_sender`, `message_reciever`, `message_content`, `message_time`, `messsage_type`, `message_color`, `message_is_secret`, `message_is_kick`) VALUES
(76, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-05-28 23:55:58', 0, NULL, NULL, NULL),
(77, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-05-28 23:56:14', 0, NULL, NULL, NULL),
(78, 'test3', '【系统消息】', 'test3进入了聊天室!', '2013-06-01 15:44:10', 0, NULL, NULL, NULL),
(79, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-04 21:56:55', 0, NULL, NULL, NULL),
(80, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-04 23:31:28', 0, NULL, NULL, NULL),
(81, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-04 23:32:04', 0, NULL, NULL, NULL),
(82, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-04 23:41:20', 0, NULL, NULL, NULL),
(83, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-04 23:41:24', 0, NULL, NULL, NULL),
(84, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-04 23:59:19', 0, NULL, NULL, NULL),
(85, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-05 00:49:19', 0, NULL, NULL, NULL),
(86, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-05 00:55:18', 0, NULL, NULL, NULL),
(87, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-05 00:59:02', 0, NULL, NULL, NULL),
(88, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-05 00:59:05', 0, NULL, NULL, NULL),
(89, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-05 00:59:35', 0, NULL, NULL, NULL),
(90, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-05 01:03:45', 0, NULL, NULL, NULL),
(91, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-05 01:06:52', 0, NULL, NULL, NULL),
(92, 'test1', 'all', '车费鬼地方', '2013-06-05 12:24:42', 0, NULL, NULL, NULL),
(93, 'test1', 'all', '水电费收费水电费', '2013-06-05 12:26:29', 0, NULL, NULL, NULL),
(94, 'test1', 'all', '哈哈哈哈哈', '2013-06-05 12:27:18', 0, NULL, NULL, NULL),
(95, 'test1', 'all', '文字位置', '2013-06-05 12:28:12', 0, NULL, NULL, NULL),
(96, 'test1', 'all', '文字位置', '2013-06-05 12:29:47', 0, NULL, NULL, NULL),
(97, 'test1', 'all', '文字位置', '2013-06-05 12:31:20', 0, NULL, NULL, NULL),
(98, 'test1', 'all', '文字位置', '2013-06-05 12:32:02', 0, NULL, NULL, NULL),
(99, 'test1', 'all', '文字位置1', '2013-06-05 12:39:47', 0, NULL, NULL, NULL),
(100, 'test1', 'all', '文字位置', '2013-06-05 12:40:40', 0, NULL, NULL, NULL),
(101, 'test1', 'all', '水电费', '2013-06-05 12:40:46', 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sigma_npc`
--

CREATE TABLE IF NOT EXISTS `sigma_npc` (
  `npc_id` int(11) NOT NULL,
  `npc_name` varchar(45) DEFAULT NULL,
  `npc_position_x` int(11) NOT NULL,
  `npc_position_y` int(11) NOT NULL,
  `npc_map_belong` int(11) NOT NULL,
  PRIMARY KEY (`npc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sigma_npc`
--

INSERT INTO `sigma_npc` (`npc_id`, `npc_name`, `npc_position_x`, `npc_position_y`, `npc_map_belong`) VALUES
(1, 'npc1', 0, 0, 0),
(3, '3', 0, 5, 2),
(4, '4', 12, 5, 4),
(5, '5', 0, 5, 2),
(6, '6', 6, 6, 6),
(7, '4', 1, 4, 4),
(9, '其它', 0, 5, 0),
(12, '12', 0, 5, 0),
(14, '111111222222', 0, 4, 4),
(19, '其它', 0, 5, 0),
(119, '其它', 0, 5, 2),
(1119, '其它', 0, 5, 2),
(12313, '12', 0, 5, 0),
(123123123, '12', 0, 5, 0),
(2147483647, '12', 0, 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sigma_task`
--

CREATE TABLE IF NOT EXISTS `sigma_task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_type` int(1) NOT NULL DEFAULT '0',
  `task_problem_id` int(11) DEFAULT NULL,
  `task_name` varchar(45) NOT NULL,
  `task_pretask` int(11) NOT NULL DEFAULT '0',
  `npc_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `task_prerequisite_idx` (`task_pretask`),
  KEY `task_npc_idx` (`npc_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `sigma_task`
--

INSERT INTO `sigma_task` (`task_id`, `task_type`, `task_problem_id`, `task_name`, `task_pretask`, `npc_id`) VALUES
(1, 0, 1, '10000', 1, 1),
(2, 0, 2, '20000', 1, 1),
(3, 0, 30000, '30000', 3, 1),
(4, 0, 40000, '40000', 3, 1),
(5, 0, 5, '50000', 1, 1),
(6, 0, 60000, '60000', 2, 1),
(7, 0, 70000, '70000', 4, 1),
(8, 0, 80000, '80000', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sigma_tmp_map`
--

CREATE TABLE IF NOT EXISTS `sigma_tmp_map` (
  `row` int(11) NOT NULL,
  `col` int(11) NOT NULL,
  `strMap` varchar(1024) NOT NULL,
  `pos_x` int(11) NOT NULL,
  `pos_y` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sigma_tmp_map`
--

INSERT INTO `sigma_tmp_map` (`row`, `col`, `strMap`, `pos_x`, `pos_y`, `id`) VALUES
(30, 30, '111110001111111111111111111111111110001111111111111111111111111110000000000000000000000011111110000000000000000000000011111110000111111111111111100011111110000111111111111111100011111110000111111111110001100011111110000111111111110001100011111110000111010001110001100011111110000111000000000001100011111110000111000000000001100011111110000111000000000001100011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111110000111111000011111100011111110000111111000011111100011111110000111100000011110000011111110000111111000011111100011111110000111111000011111100011111110000000000000000000000011111110000111111000011111100011111110000111111000011111100011111110000111100000011110000011111110000111111000011111100011111110000111111000011111100011000000000000000000000000000011000000000000000000000000000011111110000111111111111111111111', 1, 11, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sigma_user`
--

CREATE TABLE IF NOT EXISTS `sigma_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_password` varchar(45) NOT NULL,
  `user_username` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_username_UNIQUE` (`user_username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `sigma_user`
--

INSERT INTO `sigma_user` (`user_id`, `user_password`, `user_username`) VALUES
(1, 'test1', 'test1'),
(2, 'test2', 'test2'),
(3, 'test3', 'test3'),
(4, 'test4', 'test4');

-- --------------------------------------------------------

--
-- Table structure for table `sigma_user_competition`
--

CREATE TABLE IF NOT EXISTS `sigma_user_competition` (
  `user_competition_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_competition_user_id` int(11) DEFAULT NULL,
  `user_competition_indentify` int(1) DEFAULT NULL,
  `user_competition_group` int(1) DEFAULT NULL,
  PRIMARY KEY (`user_competition_id`),
  KEY `user_idx` (`user_competition_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `sigma_user_online`
--

CREATE TABLE IF NOT EXISTS `sigma_user_online` (
  `online_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `online_time_now` datetime DEFAULT NULL,
  `online_from_time` datetime DEFAULT NULL,
  PRIMARY KEY (`online_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sigma_user_online`
--

INSERT INTO `sigma_user_online` (`online_name`, `online_time_now`, `online_from_time`) VALUES
('test1', '2013-06-05 01:06:50', '2013-06-05 12:37:33');

-- --------------------------------------------------------

--
-- Table structure for table `sigma_user_task`
--

CREATE TABLE IF NOT EXISTS `sigma_user_task` (
  `user_task_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_task_task_id` int(11) NOT NULL,
  `user_task_user_id` int(11) NOT NULL,
  `user_task_status` int(1) NOT NULL,
  PRIMARY KEY (`user_task_id`),
  KEY `user_task_idx` (`user_task_user_id`),
  KEY `task_id_idx` (`user_task_task_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `sigma_user_task`
--

INSERT INTO `sigma_user_task` (`user_task_id`, `user_task_task_id`, `user_task_user_id`, `user_task_status`) VALUES
(1, 1, 1, 0),
(2, 2, 1, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sigma_blog`
--
ALTER TABLE `sigma_blog`
  ADD CONSTRAINT `author_user` FOREIGN KEY (`blog_user_id`) REFERENCES `sigma_user` (`user_username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_competition`
--
ALTER TABLE `sigma_competition`
  ADD CONSTRAINT `creater_user` FOREIGN KEY (`competition_creater`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_competition_submit`
--
ALTER TABLE `sigma_competition_submit`
  ADD CONSTRAINT `submit_user` FOREIGN KEY (`competition_submit_user_id`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_task`
--
ALTER TABLE `sigma_task`
  ADD CONSTRAINT ` task_npc_idx ` FOREIGN KEY (`npc_id`) REFERENCES `sigma_npc` (`npc_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `task_prerequisite` FOREIGN KEY (`task_pretask`) REFERENCES `sigma_task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_user_competition`
--
ALTER TABLE `sigma_user_competition`
  ADD CONSTRAINT `user` FOREIGN KEY (`user_competition_user_id`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_user_task`
--
ALTER TABLE `sigma_user_task`
  ADD CONSTRAINT `task_id` FOREIGN KEY (`user_task_task_id`) REFERENCES `sigma_task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_task_user_id`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
