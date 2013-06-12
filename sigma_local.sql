-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2013 at 04:54 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=79 ;

--
-- Dumping data for table `sigma_message`
--

INSERT INTO `sigma_message` (`message_id`, `message_sender`, `message_reciever`, `message_content`, `message_time`, `messsage_type`, `message_color`, `message_is_secret`, `message_is_kick`) VALUES
(46, 'test3', '【系统消息】', 'test3进入了聊天室!', '2013-05-23 23:14:04', 0, NULL, NULL, NULL),
(47, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-05-23 23:14:19', 0, NULL, NULL, NULL),
(48, 'test3', 'all', '来啊，大家一起来聊天呀', '2013-05-23 23:14:40', 0, NULL, NULL, NULL),
(49, 'test3', 'all', '呵呵，你们想聊些什么呢', '2013-05-23 23:14:50', 0, NULL, NULL, NULL),
(50, 'test3', 'all', '大家一起来搞基啊啊', '2013-05-23 23:15:58', 0, NULL, NULL, NULL),
(51, 'test3', 'all', '受打击了附近收到飞', '2013-05-23 23:16:07', 0, NULL, NULL, NULL),
(52, 'test1', 'all', '', '2013-05-23 23:16:26', 0, NULL, NULL, NULL),
(53, 'test1', 'all', '', '2013-05-23 23:18:39', 0, NULL, NULL, NULL),
(54, 'test1', 'all', 'sdasd', '2013-05-23 23:18:49', 0, NULL, NULL, NULL),
(55, 'test2', '【系统消息】', 'test2进入了聊天室!', '2013-05-23 23:19:34', 0, NULL, NULL, NULL),
(56, 'test1', 'all', '文字位置', '2013-05-23 23:23:44', 0, NULL, NULL, NULL),
(57, 'test3', 'all', '哈哈，收费的电视费收费', '2013-05-23 23:23:57', 0, NULL, NULL, NULL),
(58, 'test1', 'all', '收费老师的咖啡机', '2013-05-23 23:24:08', 0, NULL, NULL, NULL),
(59, 'test1', 'all', '@@', '2013-05-23 23:26:53', 0, NULL, NULL, NULL),
(60, 'test1', 'all', '水电费水电费', '2013-05-23 23:27:01', 0, NULL, NULL, NULL),
(61, 'test1', 'all', '@', '2013-05-23 23:27:05', 0, NULL, NULL, NULL),
(62, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-05-24 00:28:49', 0, NULL, NULL, NULL),
(63, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-05-24 00:28:52', 0, NULL, NULL, NULL),
(64, 'test3', '【系统消息】', 'test3进入了聊天室!', '2013-05-24 00:28:56', 0, NULL, NULL, NULL),
(65, 'test3', 'all', '哈哈，大家好啊', '2013-05-24 00:36:57', 0, NULL, NULL, NULL),
(66, 'test3', '【系统消息】', 'test3离开了聊天室!', '2013-05-24 19:43:15', 0, NULL, NULL, NULL),
(67, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-05-24 19:43:23', 0, NULL, NULL, NULL),
(68, 'test1', 'all', '哈哈哈', '2013-05-24 19:43:36', 0, NULL, NULL, NULL),
(69, 'test1', 'all', '贾汪哦', '2013-05-24 19:43:43', 0, NULL, NULL, NULL),
(70, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-05-24 19:44:11', 0, NULL, NULL, NULL),
(71, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-05-25 09:28:32', 0, NULL, NULL, NULL),
(72, 'test1', 'all', '这个邪恶的师姐呀', '2013-05-28 15:35:02', 0, NULL, NULL, NULL),
(73, 'test1', 'all', '拉拉拉阿拉', '2013-05-28 15:35:33', 0, NULL, NULL, NULL),
(74, 'test1', 'all', '文字位置', '2013-05-28 15:41:07', 0, NULL, NULL, NULL),
(75, 'test1', 'all', '水电费水电费水电费', '2013-05-28 15:41:20', 0, NULL, NULL, NULL),
(76, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-05-28 23:55:58', 0, NULL, NULL, NULL),
(77, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-05-28 23:56:14', 0, NULL, NULL, NULL),
(78, 'test3', '【系统消息】', 'test3进入了聊天室!', '2013-06-01 15:44:10', 0, NULL, NULL, NULL);

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
(0, '7', 0, 0, 0),
(1, 'npc1', 0, 0, 0),
(2, '2', 4, 4, 2),
(3, '3', 3, 3, 3),
(4, '4', 4, 4, 4),
(6, '6', 6, 6, 6),
(7, '7', 7, 7, 7),
(12, '12', 12, 12, 12),
(88, '88', 88, 88, 88);

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
('test1', '2013-05-28 23:56:12', '2013-06-01 16:52:45'),
('test3', '2013-06-01 15:44:09', '2013-06-01 15:44:09');

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
