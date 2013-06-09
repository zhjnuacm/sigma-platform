-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2013 at 02:30 AM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=254 ;

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
(101, 'test1', 'all', '水电费', '2013-06-05 12:40:46', 0, NULL, NULL, NULL),
(102, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-05 22:18:08', 0, NULL, NULL, NULL),
(103, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-05 22:18:13', 0, NULL, NULL, NULL),
(104, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-05 22:21:50', 0, NULL, NULL, NULL),
(105, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-05 22:21:54', 0, NULL, NULL, NULL),
(106, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-05 23:21:08', 0, NULL, NULL, NULL),
(107, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-05 23:21:12', 0, NULL, NULL, NULL),
(108, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 10:20:13', 0, NULL, NULL, NULL),
(109, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-06 10:20:24', 0, NULL, NULL, NULL),
(110, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 10:20:45', 0, NULL, NULL, NULL),
(111, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-06 10:26:49', 0, NULL, NULL, NULL),
(112, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 10:26:53', 0, NULL, NULL, NULL),
(113, 'test1', 'all', '文字位置', '2013-06-06 10:59:03', 0, NULL, NULL, NULL),
(114, 'test1', 'all', '哈哈哈', '2013-06-06 10:59:09', 0, NULL, NULL, NULL),
(115, 'test1', 'all', '文字位置', '2013-06-06 15:55:21', 0, NULL, NULL, NULL),
(116, 'test1', 'all', '哈哈', '2013-06-06 15:55:31', 0, NULL, NULL, NULL),
(117, 'test1', 'all', '嘿嘿', '2013-06-06 15:55:46', 0, NULL, NULL, NULL),
(118, 'test1', 'all', '哈哈', '2013-06-06 15:59:35', 0, NULL, NULL, NULL),
(119, 'test1', 'all', '嘿嘿，你在干吗', '2013-06-06 15:59:43', 0, NULL, NULL, NULL),
(120, 'test1', 'all', 'sdfsdf', '2013-06-06 15:59:54', 0, NULL, NULL, NULL),
(121, 'test1', 'all', '文字位置', '2013-06-06 16:00:34', 0, NULL, NULL, NULL),
(122, 'test1', 'all', '嘿嘿', '2013-06-06 16:00:36', 0, NULL, NULL, NULL),
(123, 'test1', 'all', '哈哈哈', '2013-06-06 16:00:42', 0, NULL, NULL, NULL),
(124, 'test1', 'all', '文字位置', '2013-06-06 16:01:18', 0, NULL, NULL, NULL),
(125, 'test1', 'all', '嘿嘿', '2013-06-06 16:01:20', 0, NULL, NULL, NULL),
(126, 'test1', 'all', '文字位置', '2013-06-06 16:01:40', 0, NULL, NULL, NULL),
(127, 'test1', 'all', '水电费', '2013-06-06 16:01:42', 0, NULL, NULL, NULL),
(128, 'test1', 'all', '多给点】gdfgdfg', '2013-06-06 16:01:46', 0, NULL, NULL, NULL),
(129, 'test1', 'all', '水电费水电费', '2013-06-06 16:01:48', 0, NULL, NULL, NULL),
(130, 'test1', 'all', '', '2013-06-06 16:01:49', 0, NULL, NULL, NULL),
(131, 'test1', 'all', '', '2013-06-06 16:01:52', 0, NULL, NULL, NULL),
(132, 'test1', 'all', '', '2013-06-06 16:01:54', 0, NULL, NULL, NULL),
(133, 'test1', 'all', '', '2013-06-06 16:01:56', 0, NULL, NULL, NULL),
(134, 'test1', 'all', '', '2013-06-06 16:01:58', 0, NULL, NULL, NULL),
(135, 'test1', 'all', '吃饭', '2013-06-06 16:02:02', 0, NULL, NULL, NULL),
(136, 'test1', 'all', '', '2013-06-06 16:02:22', 0, NULL, NULL, NULL),
(137, 'test1', 'all', '', '2013-06-06 16:02:24', 0, NULL, NULL, NULL),
(138, 'test1', 'all', '文字位置', '2013-06-06 16:03:24', 0, NULL, NULL, NULL),
(139, 'test1', 'all', '文字位置', '2013-06-06 16:03:47', 0, NULL, NULL, NULL),
(140, 'test1', 'all', '嘿嘿', '2013-06-06 16:04:03', 0, NULL, NULL, NULL),
(141, 'test1', 'all', '文字位置', '2013-06-06 16:04:41', 0, NULL, NULL, NULL),
(142, 'test1', 'all', '你想干吗', '2013-06-06 16:04:45', 0, NULL, NULL, NULL),
(143, 'test1', 'all', '没有啊', '2013-06-06 16:04:52', 0, NULL, NULL, NULL),
(144, 'test1', 'all', '文字位置', '2013-06-06 16:06:16', 0, NULL, NULL, NULL),
(145, 'test1', 'all', '文字位置', '2013-06-06 16:10:46', 0, NULL, NULL, NULL),
(146, 'test1', 'all', '哈哈', '2013-06-06 16:10:47', 0, NULL, NULL, NULL),
(147, 'test1', 'all', '你想干吗', '2013-06-06 16:10:49', 0, NULL, NULL, NULL),
(148, 'test1', 'all', '文字位置', '2013-06-06 16:11:10', 0, NULL, NULL, NULL),
(149, 'test1', 'all', '怎么说，你想干吗', '2013-06-06 16:11:26', 0, NULL, NULL, NULL),
(150, 'test1', 'all', '撒范德萨雷锋精神，水电费了水电费空手道f', '2013-06-06 16:12:06', 0, NULL, NULL, NULL),
(151, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-06 16:26:02', 0, NULL, NULL, NULL),
(152, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 16:26:06', 0, NULL, NULL, NULL),
(153, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-06 16:31:57', 0, NULL, NULL, NULL),
(154, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 16:32:01', 0, NULL, NULL, NULL),
(155, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-06 16:38:07', 0, NULL, NULL, NULL),
(156, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 16:38:11', 0, NULL, NULL, NULL),
(157, 'test1', 'all', '文字位置', '2013-06-06 16:38:43', 0, NULL, NULL, NULL),
(158, 'test1', 'all', '哈哈', '2013-06-06 16:38:47', 0, NULL, NULL, NULL),
(159, 'test1', 'all', '文字位置', '2013-06-06 16:39:11', 0, NULL, NULL, NULL),
(160, 'test1', 'all', '还是两次', '2013-06-06 16:39:20', 0, NULL, NULL, NULL),
(161, 'test1', 'all', '这个是什么原因呢', '2013-06-06 16:41:31', 0, NULL, NULL, NULL),
(162, 'test1', 'all', '文字位置', '2013-06-06 16:42:58', 0, NULL, NULL, NULL),
(163, 'test1', 'all', '分割', '2013-06-06 16:43:07', 0, NULL, NULL, NULL),
(164, 'test1', 'all', '真的事这样吗', '2013-06-06 16:57:07', 0, NULL, NULL, NULL),
(165, 'test1', 'all', '哎哟哎哟', '2013-06-06 16:57:13', 0, NULL, NULL, NULL),
(166, 'test1', 'all', '哈哈', '2013-06-06 16:57:54', 0, NULL, NULL, NULL),
(167, 'test1', 'all', '怎么会这样呢', '2013-06-06 16:58:01', 0, NULL, NULL, NULL),
(168, 'test1', 'all', '嘿嘿，，不知道啊', '2013-06-06 16:58:11', 0, NULL, NULL, NULL),
(169, 'test1', 'all', '是啊，我也不知道为什么是这样的', '2013-06-06 16:58:18', 0, NULL, NULL, NULL),
(170, 'test1', 'all', '是电饭锅', '2013-06-06 17:00:21', 0, NULL, NULL, NULL),
(171, 'test1', 'all', '文字位置', '2013-06-06 17:00:30', 0, NULL, NULL, NULL),
(172, 'test1', 'all', 'sdfsdf', '2013-06-06 17:01:02', 0, NULL, NULL, NULL),
(173, 'test1', 'all', '的非官方', '2013-06-06 17:01:07', 0, NULL, NULL, NULL),
(174, 'test1', 'all', '两个', '2013-06-06 17:01:19', 0, NULL, NULL, NULL),
(175, 'test1', 'all', '哈哈', '2013-06-06 17:01:21', 0, NULL, NULL, NULL),
(176, 'test1', 'all', '这又是怎么一回事二', '2013-06-06 17:01:54', 0, NULL, NULL, NULL),
(177, 'test1', 'all', '文字位置', '2013-06-06 17:02:46', 0, NULL, NULL, NULL),
(178, 'test1', 'all', '哈哈，这次就不会了吧，数据库还要加锁啊', '2013-06-06 17:03:07', 0, NULL, NULL, NULL),
(179, 'test1', 'all', '2秒可以吗', '2013-06-06 17:04:01', 0, NULL, NULL, NULL),
(180, 'test1', 'all', '3秒好像就没问题了', '2013-06-06 17:04:10', 0, NULL, NULL, NULL),
(181, 'test1', 'all', '文字位置', '2013-06-06 17:05:30', 0, NULL, NULL, NULL),
(182, 'test1', 'all', '这样就没有问题了吧', '2013-06-06 17:05:36', 0, NULL, NULL, NULL),
(183, 'test1', 'all', '这样就算更新数据库成功了吧', '2013-06-06 17:05:47', 0, NULL, NULL, NULL),
(184, 'test1', 'all', '这样就好了吧', '2013-06-06 17:07:36', 0, NULL, NULL, NULL),
(185, 'test1', 'all', '水电费】', '2013-06-06 17:08:22', 0, NULL, NULL, NULL),
(186, 'test1', 'all', '电饭锅', '2013-06-06 17:09:01', 0, NULL, NULL, NULL),
(187, 'test1', 'all', '文字位置', '2013-06-06 17:10:12', 0, NULL, NULL, NULL),
(188, 'test1', 'all', '文字位置', '2013-06-06 17:16:27', 0, NULL, NULL, NULL),
(189, 'test1', 'all', '', '2013-06-06 17:16:28', 0, NULL, NULL, NULL),
(190, 'test1', 'all', '水电费水电费', '2013-06-06 17:16:29', 0, NULL, NULL, NULL),
(191, 'test1', 'all', 'sdf', '2013-06-06 17:16:31', 0, NULL, NULL, NULL),
(192, 'test1', 'all', '文字位置', '2013-06-06 17:17:10', 0, NULL, NULL, NULL),
(193, 'test1', 'all', 'sdfsdf', '2013-06-06 17:17:54', 0, NULL, NULL, NULL),
(194, 'test1', 'all', '水电费水电费是', '2013-06-06 17:18:19', 0, NULL, NULL, NULL),
(195, 'test1', 'all', 'sdfsdf ', '2013-06-06 17:18:59', 0, NULL, NULL, NULL),
(196, 'test1', 'all', '水电费', '2013-06-06 17:19:46', 0, NULL, NULL, NULL),
(197, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-06 17:20:24', 0, NULL, NULL, NULL),
(198, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 17:20:28', 0, NULL, NULL, NULL),
(199, 'test1', 'all', '文字位置', '2013-06-06 17:20:33', 0, NULL, NULL, NULL),
(200, 'test1', 'all', '水电费', '2013-06-06 17:20:41', 0, NULL, NULL, NULL),
(201, 'test1', 'all', 'sdfsdf', '2013-06-06 17:21:22', 0, NULL, NULL, NULL),
(202, 'test1', 'all', '文字位置', '2013-06-06 17:23:08', 0, NULL, NULL, NULL),
(203, 'test1', 'all', '草', '2013-06-06 17:23:14', 0, NULL, NULL, NULL),
(204, 'test1', 'all', '你妹你妹你妹', '2013-06-06 17:23:31', 0, NULL, NULL, NULL),
(205, 'test1', 'all', '你到底想干吗再说', '2013-06-06 17:23:40', 0, NULL, NULL, NULL),
(206, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 17:38:15', 0, NULL, NULL, NULL),
(207, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-06 17:38:44', 0, NULL, NULL, NULL),
(208, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 17:38:49', 0, NULL, NULL, NULL),
(209, 'test2', '【系统消息】', 'test2离开了聊天室!', '2013-06-06 17:39:14', 0, NULL, NULL, NULL),
(210, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 17:39:29', 0, NULL, NULL, NULL),
(211, 'test1', 'all', '哈哈', '2013-06-06 17:40:22', 0, NULL, NULL, NULL),
(212, 'test1', 'all', 'sdfsdf', '2013-06-06 17:40:28', 0, NULL, NULL, NULL),
(213, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 21:48:35', 0, NULL, NULL, NULL),
(214, 'test1', 'all', '文字位置', '2013-06-06 21:50:04', 0, NULL, NULL, NULL),
(215, 'test1', 'all', '哈哈哈', '2013-06-06 21:50:08', 0, NULL, NULL, NULL),
(216, 'test1', 'all', '水电费了圣诞节分开连锁店疯了', '2013-06-06 21:50:10', 0, NULL, NULL, NULL),
(217, 'test1', 'all', '水帘洞副教授的脸孔的感觉', '2013-06-06 21:50:16', 0, NULL, NULL, NULL),
(218, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-06 21:53:15', 0, NULL, NULL, NULL),
(219, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 21:53:19', 0, NULL, NULL, NULL),
(220, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 21:53:43', 0, NULL, NULL, NULL),
(221, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 21:56:19', 0, NULL, NULL, NULL),
(222, 'test1', 'all', '文字位置', '2013-06-06 22:00:59', 0, NULL, NULL, NULL),
(223, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-06 22:05:18', 0, NULL, NULL, NULL),
(224, 'test1', 'all', '文字位置', '2013-06-06 22:05:46', 0, NULL, NULL, NULL),
(225, 'test1', 'all', '文字位置', '2013-06-06 22:44:12', 0, NULL, NULL, NULL),
(226, 'test1', 'all', '哈哈，这就是大地图呀', '2013-06-06 22:56:17', 0, NULL, NULL, NULL),
(227, 'test1', 'all', '文字位置', '2013-06-06 22:59:52', 0, NULL, NULL, NULL),
(228, 'test1', 'all', '哈哈，就是文字位置咯咯咯来咯咯咯咯', '2013-06-06 23:00:03', 0, NULL, NULL, NULL),
(229, 'test1', 'all', '随便聊咯。', '2013-06-06 23:00:09', 0, NULL, NULL, NULL),
(230, 'test1', 'all', '文字位置', '2013-06-06 23:03:59', 0, NULL, NULL, NULL),
(231, 'test1', 'all', '聊天窗口哟哟哟', '2013-06-06 23:04:11', 0, NULL, NULL, NULL),
(232, 'test3', '【系统消息】', 'test3进入了聊天室!', '2013-06-09 14:38:39', 0, NULL, NULL, NULL),
(233, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-09 14:48:51', 0, NULL, NULL, NULL),
(234, 'admin', '【系统消息】', 'admin进入了聊天室!', '2013-06-09 14:48:59', 0, NULL, NULL, NULL),
(235, 'admin', '【系统消息】', 'admin离开了聊天室!', '2013-06-09 14:52:07', 0, NULL, NULL, NULL),
(236, 't', '【系统消息】', 't进入了聊天室!', '2013-06-09 15:12:50', 0, NULL, NULL, NULL),
(237, 't', '【系统消息】', 't离开了聊天室!', '2013-06-09 15:12:55', 0, NULL, NULL, NULL),
(238, 'test1', '【系统消息】', 'test1进入了聊天室!', '0000-00-00 00:00:00', 0, NULL, NULL, NULL),
(239, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-09 17:12:03', 0, NULL, NULL, NULL),
(240, 'admin', '【系统消息】', 'admin进入了聊天室!', '2013-06-09 17:12:09', 0, NULL, NULL, NULL),
(241, 'admin', '【系统消息】', 'admin离开了聊天室!', '2013-06-09 17:12:17', 0, NULL, NULL, NULL),
(242, 'test1', '【系统消息】', 'test1进入了聊天室!', '2013-06-09 17:13:41', 0, NULL, NULL, NULL),
(243, 'test1', '【系统消息】', 'test1离开了聊天室!', '2013-06-09 23:34:16', 0, NULL, NULL, NULL),
(244, 'admin', '【系统消息】', 'admin进入了聊天室!', '2013-06-09 23:37:27', 0, NULL, NULL, NULL),
(245, 'admin', '【系统消息】', 'admin进入了聊天室!', '2013-06-10 02:01:32', 0, NULL, NULL, NULL),
(246, 'admin', '【系统消息】', 'admin离开了聊天室!', '2013-06-10 02:04:33', 0, NULL, NULL, NULL),
(247, 'admin', '【系统消息】', 'admin进入了聊天室!', '2013-06-10 02:05:43', 0, NULL, NULL, NULL),
(248, 'admin', '【系统消息】', 'admin离开了聊天室!', '2013-06-10 02:06:37', 0, NULL, NULL, NULL),
(249, 'admin', '【系统消息】', 'admin进入了聊天室!', '2013-06-10 02:07:15', 0, NULL, NULL, NULL),
(250, 'admin', '【系统消息】', 'admin离开了聊天室!', '2013-06-10 02:08:29', 0, NULL, NULL, NULL),
(251, '45', '【系统消息】', '45进入了聊天室!', '2013-06-10 02:14:25', 0, NULL, NULL, NULL),
(252, '45', '【系统消息】', '45离开了聊天室!', '2013-06-10 02:14:57', 0, NULL, NULL, NULL),
(253, 'admin', '【系统消息】', 'admin进入了聊天室!', '2013-06-10 02:19:19', 0, NULL, NULL, NULL);

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
(2, 'npc2', 5, 6, 1),
(3, 'npc3', 6, 7, 1),
(4, 'npc4', 7, 8, 1);

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
(30, 30, '111110001111111111111111111111111110001111111111111111111111111110000000000000000000000011111110000000000000000000000011111110000111111111111111100011111110000111111111111111100011111110000111111111110001100011111110000111111111110001100011111110000111010001110001100011111110000111000000000001100011111110000111000000000001100011111110000111000000000001100011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111110000111111000011111100011111110000111111000011111100011111110000111100000011110000011111110000111111000011111100011111110000111111000011111100011111110000000000000000000000011111110000111111000011111100011111110000111111000011111100011111110000111100000011110000011111110000111111000011111100011111110000111111000011111100011000000000000000000000000000011000000000000000000000000000011111110000111111111111111111111', 2, 11, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sigma_user`
--

CREATE TABLE IF NOT EXISTS `sigma_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_password` varchar(45) NOT NULL,
  `user_password_repeat` varchar(45) NOT NULL,
  `user_username` varchar(45) NOT NULL,
  `user_email` varchar(105) NOT NULL,
  `user_sign` text NOT NULL,
  `user_declare` text NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_username_UNIQUE` (`user_username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `sigma_user`
--

INSERT INTO `sigma_user` (`user_id`, `user_password`, `user_password_repeat`, `user_username`, `user_email`, `user_sign`, `user_declare`) VALUES
(1, 'test1', '', 'test1', '', '', ''),
(2, 'test2', '', 'test2', '', '', ''),
(3, 'test3', '', 'test3', '', '', ''),
(4, 'test4', '', 'test4', '', '', ''),
(5, 'admin', 'admin', 'admin', 'guichyu@gmail.com', '我的第一个个性签名,我的第一个个性签名,我的第一个个性签名,我的第一个个性签名,我的第一个个性签名', '我的第一个个人说明'),
(9, '45', '45', '45', '45', '', '');

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
('admin', '2013-06-10 02:19:18', '2013-06-10 02:19:18'),
('test3', '2013-06-09 14:38:38', '2013-06-09 14:38:38');

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
