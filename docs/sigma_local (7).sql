-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2013 at 07:56 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=70 ;

--
-- Dumping data for table `sigma_message`
--

INSERT INTO `sigma_message` (`message_id`, `message_sender`, `message_reciever`, `message_content`, `message_time`, `messsage_type`, `message_color`, `message_is_secret`, `message_is_kick`) VALUES
(1, 'admin', 'all', '文字位置', '2013-06-13 21:41:01', 0, NULL, NULL, NULL),
(2, 'admin', 'all', '文字位置', '2013-06-13 21:44:40', 0, NULL, NULL, NULL),
(3, 'admin', 'all', '来吧', '2013-06-13 21:44:47', 0, NULL, NULL, NULL),
(4, 'admin', 'all', '这样就正常很多了', '2013-06-13 21:44:51', 0, NULL, NULL, NULL),
(5, 'admin', 'all', '这样大家就可以聊天了', '2013-06-13 21:44:56', 0, NULL, NULL, NULL),
(6, 'admin', 'all', '哈哈', '2013-06-13 21:44:58', 0, NULL, NULL, NULL),
(7, 'admin', 'all', '来吧', '2013-06-13 21:46:15', 0, NULL, NULL, NULL),
(8, 'admin', 'all', '来吧', '2013-06-13 21:46:18', 0, NULL, NULL, NULL),
(9, 'admin', 'all', '这样怎么样', '2013-06-13 21:46:42', 0, NULL, NULL, NULL),
(10, 'admin', 'all', '还是不怎么快啊', '2013-06-13 21:46:48', 0, NULL, NULL, NULL),
(11, 'admin', 'all', '这个怎么说', '2013-06-13 21:46:54', 0, NULL, NULL, NULL),
(12, 'admin', 'all', '怎么解决还是个问题哦', '2013-06-13 21:46:58', 0, NULL, NULL, NULL),
(13, 'admin', 'all', '呵呵', '2013-06-13 22:17:36', 0, NULL, NULL, NULL),
(14, 'admin', 'all', '来啊', '2013-06-13 22:17:39', 0, NULL, NULL, NULL),
(15, 'admin', 'all', '，大家一起聊天呀', '2013-06-13 22:17:42', 0, NULL, NULL, NULL),
(16, 'admin', 'all', '文字位置', '2013-06-13 22:19:47', 0, NULL, NULL, NULL),
(17, 'admin', 'all', '怎么好像又抽风了', '2013-06-13 22:20:01', 0, NULL, NULL, NULL),
(18, 'admin', 'all', '怎么又抽粪搞了 啊', '2013-06-13 22:20:31', 0, NULL, NULL, NULL),
(19, 'admin', 'all', '没事吧', '2013-06-13 22:20:38', 0, NULL, NULL, NULL),
(20, 'admin', 'all', '好像已经没事了', '2013-06-13 22:20:42', 0, NULL, NULL, NULL),
(21, 'admin', 'all', '这样就可以聊天啦', '2013-06-13 22:20:51', 0, NULL, NULL, NULL),
(22, 'admin', 'all', '好像已经没事了吧', '2013-06-13 22:21:02', 0, NULL, NULL, NULL),
(23, 'admin', 'all', '文字位置', '2013-06-13 22:21:20', 0, NULL, NULL, NULL),
(24, 'admin', 'all', '这样怎么样呢', '2013-06-13 22:21:29', 0, NULL, NULL, NULL),
(25, 'admin', 'all', '是不是非常卡啊', '2013-06-13 22:25:40', 0, NULL, NULL, NULL),
(26, 'admin', 'all', '好像有点卡啊，，这个又是啥问题来着', '2013-06-13 22:25:59', 0, NULL, NULL, NULL),
(27, 'admin', 'all', '怎么了，怎么了', '2013-06-13 22:26:24', 0, NULL, NULL, NULL),
(28, 'admin', 'all', '怎么又有点儿卡啦。。。。', '2013-06-13 22:26:36', 0, NULL, NULL, NULL),
(29, 'admin', 'all', '文字位置', '2013-06-13 22:28:35', 0, NULL, NULL, NULL),
(30, 'admin', 'all', '啥，，难道是我服务器的问题吗', '2013-06-13 22:28:43', 0, NULL, NULL, NULL),
(31, 'admin', 'all', '这个提议责编呢', '2013-06-13 22:29:33', 0, NULL, NULL, NULL),
(32, 'admin', 'all', '感觉好像挺明显了啊', '2013-06-13 22:29:42', 0, NULL, NULL, NULL),
(33, 'admin', 'all', '他怎么不回显了啊', '2013-06-13 22:29:46', 0, NULL, NULL, NULL),
(34, 'admin', 'all', '怎么额和你卡', '2013-06-13 22:33:49', 0, NULL, NULL, NULL),
(35, 'admin', 'all', '怎么又这样了恩', '2013-06-13 22:34:56', 0, NULL, NULL, NULL),
(36, 'admin', 'all', '好卡啊', '2013-06-13 22:37:20', 0, NULL, NULL, NULL),
(37, 'admin', 'all', '怎么会这样啊', '2013-06-13 22:37:27', 0, NULL, NULL, NULL),
(38, 'admin', 'all', '先换下数据库', '2013-06-13 22:37:59', 0, NULL, NULL, NULL),
(39, 'admin', 'all', '吧原来的删了 ba', '2013-06-13 22:38:03', 0, NULL, NULL, NULL),
(40, 'admin', 'all', '这样就没事了啊', '2013-06-13 22:38:06', 0, NULL, NULL, NULL),
(41, 'admin', 'all', '我把他们全都加上去了', '2013-06-13 22:38:33', 0, NULL, NULL, NULL),
(42, 'admin', 'all', '这样好像就没事了啊', '2013-06-13 22:38:39', 0, NULL, NULL, NULL),
(43, 'admin', 'all', '你们试试看啊', '2013-06-13 22:38:55', 0, NULL, NULL, NULL),
(44, 'admin', 'all', '再弄弄看啊', '2013-06-13 22:38:58', 0, NULL, NULL, NULL),
(45, 'admin', 'all', '这样啊', '2013-06-13 22:40:09', 0, NULL, NULL, NULL),
(46, 'admin', 'all', '能不能就看任凭咯', '2013-06-13 22:40:14', 0, NULL, NULL, NULL),
(47, 'admin', 'all', '文字位置', '2013-06-13 22:40:38', 0, NULL, NULL, NULL),
(48, 'admin', 'all', '好看啊，，这是森么原因啊', '2013-06-13 22:40:44', 0, NULL, NULL, NULL),
(49, 'admin', 'all', '这样吗。呵呵，呵呵，呵呵', '2013-06-13 22:40:53', 0, NULL, NULL, NULL),
(50, 'admin', 'all', '快点吧，快点吧，，这样 a', '2013-06-13 22:43:28', 0, NULL, NULL, NULL),
(51, 'admin', 'all', '', '2013-06-13 22:43:29', 0, NULL, NULL, NULL),
(52, 'admin', 'all', '文字位置', '2013-06-13 22:44:00', 0, NULL, NULL, NULL),
(53, 'admin', 'all', '文字位置', '2013-06-13 22:52:08', 0, NULL, NULL, NULL),
(54, 'admin', 'all', '就健康和健康。。。', '2013-06-13 22:52:22', 0, NULL, NULL, NULL),
(55, 'admin', 'all', '哈哈，有啊', '2013-06-13 22:53:56', 0, NULL, NULL, NULL),
(56, 'admin', 'all', '怎么了', '2013-06-13 22:54:06', 0, NULL, NULL, NULL),
(57, 'admin', 'all', '超市', '2013-06-13 22:54:20', 0, NULL, NULL, NULL),
(58, 'admin', '【系统消息】', 'admin离开了聊天室!', '2013-06-13 22:55:52', 0, NULL, NULL, NULL),
(59, 'admin', '【系统消息】', 'admin进入了聊天室!', '2013-06-13 22:56:04', 0, NULL, NULL, NULL),
(60, 'admin', 'all', '文字位置', '2013-06-16 03:32:27', 0, NULL, NULL, NULL),
(61, 'admin', 'all', '呵呵，你想昂吗', '2013-06-16 03:32:31', 0, NULL, NULL, NULL),
(62, 'admin', 'all', '回车怎么都不见了啊', '2013-06-16 03:32:40', 0, NULL, NULL, NULL),
(63, 'admin', 'all', '干吗，干吗', '2013-06-16 15:06:24', 0, NULL, NULL, NULL),
(64, 'admin', 'all', '哈哈，，，', '2013-06-16 15:06:29', 0, NULL, NULL, NULL),
(65, 'admin', 'all', '色调分离空手道风来树动房顶上g', '2013-06-16 15:06:33', 0, NULL, NULL, NULL),
(66, 'admin', '【系统消息】', 'admin离开了聊天室!', '2013-06-16 15:35:37', 0, NULL, NULL, NULL),
(67, 'jopix0', '【系统消息】', 'jopix0进入了聊天室!', '2013-06-16 15:35:47', 0, NULL, NULL, NULL),
(68, 'jopix0', '【系统消息】', 'jopix0离开了聊天室!', '2013-06-16 16:28:51', 0, NULL, NULL, NULL),
(69, 'admin', '【系统消息】', 'admin进入了聊天室!', '0000-00-00 00:00:00', 0, NULL, NULL, NULL);

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
(3, 'npc3', 5, 8, 1),
(4, 'npc4', 5, 10, 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `sigma_task`
--

INSERT INTO `sigma_task` (`task_id`, `task_type`, `task_problem_id`, `task_name`, `task_pretask`, `npc_id`) VALUES
(1, 0, 1, '请熟练唱出山路十八弯', 1, 2),
(2, 0, 2, '未接受任务测试', 1, 2),
(3, 1, 1, '历史选择题', 3, 2),
(4, 2, 1, '简单计算题', 4, 2),
(5, 1, NULL, '选择题', 3, 3),
(6, 1, NULL, '选择题', 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sigma_taskpro_type0`
--

CREATE TABLE IF NOT EXISTS `sigma_taskpro_type0` (
  `problem_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `task_type` int(11) NOT NULL DEFAULT '0',
  `problem_name` varchar(105) NOT NULL,
  `problem_declare` text NOT NULL,
  `problem_answer` text NOT NULL,
  PRIMARY KEY (`problem_id`),
  KEY `belong_task` (`task_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `sigma_taskpro_type0`
--

INSERT INTO `sigma_taskpro_type0` (`problem_id`, `task_id`, `task_type`, `problem_name`, `problem_declare`, `problem_answer`) VALUES
(1, 1, 0, '请熟练唱出山路十八弯', '如果我 和你的猫咪一起掉进水里,没关系,脂肪有浮力,你们沉不下去', '答案自己慢慢想'),
(2, 2, 0, '未接受任务测试', '如果我 和你的猫咪一起掉进水里,没关系,脂肪有浮力,你们沉不下去', '答案自己慢慢想');

-- --------------------------------------------------------

--
-- Table structure for table `sigma_taskpro_type1`
--

CREATE TABLE IF NOT EXISTS `sigma_taskpro_type1` (
  `problem_id` int(11) NOT NULL AUTO_INCREMENT,
  `problem_type` int(1) NOT NULL DEFAULT '0',
  `problem_name` varchar(105) DEFAULT NULL,
  `problem_declare` text NOT NULL,
  `problem_answer` varchar(105) DEFAULT NULL,
  `task_id` int(11) NOT NULL,
  `task_type` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`problem_id`),
  KEY `foreignKey_type1_belong_task` (`task_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `sigma_taskpro_type1`
--

INSERT INTO `sigma_taskpro_type1` (`problem_id`, `problem_type`, `problem_name`, `problem_declare`, `problem_answer`, `task_id`, `task_type`) VALUES
(1, 1, '历史选择题', '请问朱元璋是谁!^唐太宗&唐高宗&明太祖&康熙', 'C', 3, 1),
(2, 0, '网络选择题', '神兽“雅蔑蝶”原产于哪个国家（）^韩国&日本&越南&泰国', 'B', 5, 1),
(3, 0, '漫画选择题', '我爱罗额头上刻的是什么（）？^爱.&我靠.&检疫合格，准许屠宰.&计划生育是一项基本国策.', 'A', 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sigma_taskpro_type2`
--

CREATE TABLE IF NOT EXISTS `sigma_taskpro_type2` (
  `problem_id` int(11) NOT NULL AUTO_INCREMENT,
  `problem_type` int(1) NOT NULL DEFAULT '0',
  `problem_name` varchar(105) NOT NULL,
  `problem_declare` text NOT NULL,
  `problem_answer` varchar(105) DEFAULT NULL,
  `task_id` int(11) NOT NULL,
  `task_type` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`problem_id`),
  KEY `foreignKey_type2_belong_task` (`task_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `sigma_taskpro_type2`
--

INSERT INTO `sigma_taskpro_type2` (`problem_id`, `problem_type`, `problem_name`, `problem_declare`, `problem_answer`, `task_id`, `task_type`) VALUES
(1, 2, '简单计算题', '请问(1+2+5+78+78-41+45-78+145-145 = ?)', '90', 4, 2);

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
  `chat_status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sigma_tmp_map`
--

INSERT INTO `sigma_tmp_map` (`row`, `col`, `strMap`, `pos_x`, `pos_y`, `id`, `chat_status`) VALUES
(30, 30, '111110001111111111111111111111111110001111111111111111111111111110000000000000000000000011111110000000000000000000000011111110000111111111111111100011111110000111111111111111100011111110000111111111110001100011111110000111111111110001100011111110000111010001110001100011111110000111000000000001100011111110000111000000000001100011111110000111000000000001100011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000111110000111111000011111100011111110000111111000011111100011111110000111100000011110000011111110000111111000011111100011111110000111111000011111100011111110000000000000000000000011111110000111111000011111100011111110000111111000011111100011111110000111100000011110000011111110000111111000011111100011111110000111111000011111100011000000000000000000000000000011000000000000000000000000000011111110000111111111111111111111', 2, 11, 1, 0);

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
  `user_place` varchar(45) NOT NULL,
  `user_photo` text NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_username_UNIQUE` (`user_username`),
  UNIQUE KEY `user_username` (`user_username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `sigma_user`
--

INSERT INTO `sigma_user` (`user_id`, `user_password`, `user_password_repeat`, `user_username`, `user_email`, `user_sign`, `user_declare`, `user_place`, `user_photo`) VALUES
(1, 'test1', '', 'test1', '', '', '', '', ''),
(2, 'test2', '', 'test2', '', '', '', '', ''),
(3, 'test3', '', 'test3', '', '', '', '', ''),
(4, 'test4', '', 'test4', '', '', '', '', ''),
(5, 'admin', 'admin', 'admin', 'guichyu@gmail.com', '我的第一个个性签名,我的第一个个性签名,我的第一个个性签名,我的第一个个性签名,我的第一个个性签名', '我的第一个个人说明', '', ''),
(10, 'cchun', 'cchun', 'cchun', 'guichyu@163.com', '不留签名的路过！', '不留说明的路过！', '', ''),
(11, 'Jopix0', 'Jopix0', 'Jopix0', '', '好不想学习，想打怪，其带菜', '', '教室吹水', 'client/res/user/user_1.jpg'),
(12, 'nanke1', 'nanke1', 'nanke1', '', '好不想学习，想打怪，其带菜', '', '宿舍睡觉', 'client/res/user/user_2.jpg'),
(13, 'cchun2', 'cchun2', 'cchun2', '', '好不想学习，想打怪，其带菜', '', '魔界打怪', 'client/res/user/user_3.jpg'),
(14, 'vainner3', 'vainner3', 'vainner3', '', '好不想学习，想打怪，其带菜', '', '现实世界', 'client/res/user/user_4.jpg'),
(15, 'huan4', 'huan4', 'huan4', '', '好不想学习，想打怪，其带菜', '', '食堂泡妞', 'client/res/user/user_5.jpg'),
(16, 'Jopix5', 'Jopix5', 'Jopix5', '', '好不想学习，想打怪，其带菜', '', '教室吹水', 'client/res/user/user_1.jpg');

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
-- Table structure for table `sigma_user_friend`
--

CREATE TABLE IF NOT EXISTS `sigma_user_friend` (
  `user_name` varchar(45) NOT NULL,
  `user_friend_name` varchar(45) NOT NULL,
  PRIMARY KEY (`user_name`,`user_friend_name`),
  KEY `foreign_key_user_friend_user_friend_name` (`user_friend_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sigma_user_friend`
--

INSERT INTO `sigma_user_friend` (`user_name`, `user_friend_name`) VALUES
('admin', 'cchun2'),
('admin', 'huan4'),
('admin', 'Jopix0'),
('admin', 'nanke1'),
('admin', 'vainner3');

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
('admin', '2013-06-16 16:28:59', '2013-06-16 16:28:59'),
('test3', '2013-06-09 14:38:38', '2013-06-09 14:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `sigma_user_task`
--

CREATE TABLE IF NOT EXISTS `sigma_user_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `task_id_idx` (`task_id`),
  KEY `foreign_key_user_name` (`user_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `sigma_user_task`
--

INSERT INTO `sigma_user_task` (`id`, `task_id`, `user_name`, `status`) VALUES
(6, 4, 'admin', 1),
(8, 6, 'admin', 1);

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
-- Constraints for table `sigma_taskpro_type0`
--
ALTER TABLE `sigma_taskpro_type0`
  ADD CONSTRAINT `belong_task` FOREIGN KEY (`task_id`) REFERENCES `sigma_task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_taskpro_type1`
--
ALTER TABLE `sigma_taskpro_type1`
  ADD CONSTRAINT `foreignKey_type1_belong_task` FOREIGN KEY (`task_id`) REFERENCES `sigma_task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_taskpro_type2`
--
ALTER TABLE `sigma_taskpro_type2`
  ADD CONSTRAINT `foreignKey_type2_belong_task` FOREIGN KEY (`task_id`) REFERENCES `sigma_task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_user_competition`
--
ALTER TABLE `sigma_user_competition`
  ADD CONSTRAINT `user` FOREIGN KEY (`user_competition_user_id`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_user_friend`
--
ALTER TABLE `sigma_user_friend`
  ADD CONSTRAINT `foreign_key_user_friend_user_friend_name` FOREIGN KEY (`user_friend_name`) REFERENCES `sigma_user` (`user_username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `foreign_key_user_friend_user_name` FOREIGN KEY (`user_name`) REFERENCES `sigma_user` (`user_username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `sigma_user_task`
--
ALTER TABLE `sigma_user_task`
  ADD CONSTRAINT `foreign_key_task_id` FOREIGN KEY (`task_id`) REFERENCES `sigma_task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `foreign_key_user_name` FOREIGN KEY (`user_name`) REFERENCES `sigma_user` (`user_username`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
