-- MySQL dump 10.13  Distrib 5.5.27, for Win32 (x86)
--
-- Host: localhost    Database: sigma_local
-- ------------------------------------------------------
-- Server version	5.5.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `sigma_local`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sigma_local` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `sigma_local`;

--
-- Table structure for table `sigma_blog`
--

DROP TABLE IF EXISTS `sigma_blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_blog` (
  `blog_id` int(11) NOT NULL,
  `blog_user_id` varchar(45) DEFAULT NULL,
  `blog_title` varchar(45) DEFAULT NULL,
  `blog_content` text,
  PRIMARY KEY (`blog_id`),
  KEY `author_user_idx` (`blog_user_id`),
  CONSTRAINT `author_user` FOREIGN KEY (`blog_user_id`) REFERENCES `sigma_user` (`user_username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_blog`
--

LOCK TABLES `sigma_blog` WRITE;
/*!40000 ALTER TABLE `sigma_blog` DISABLE KEYS */;
/*!40000 ALTER TABLE `sigma_blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_competition`
--

DROP TABLE IF EXISTS `sigma_competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_competition` (
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
  KEY `creater_user_idx` (`competition_creater`),
  CONSTRAINT `creater_user` FOREIGN KEY (`competition_creater`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_competition`
--

LOCK TABLES `sigma_competition` WRITE;
/*!40000 ALTER TABLE `sigma_competition` DISABLE KEYS */;
/*!40000 ALTER TABLE `sigma_competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_competition_submit`
--

DROP TABLE IF EXISTS `sigma_competition_submit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_competition_submit` (
  `competition_submit_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_submit_user_id` int(11) DEFAULT NULL,
  `competition_submit_status` int(1) NOT NULL,
  `competition_submit_problem_id` int(11) NOT NULL,
  `competition_submit_time` datetime NOT NULL,
  PRIMARY KEY (`competition_submit_id`),
  KEY `submit_user_idx` (`competition_submit_user_id`),
  CONSTRAINT `submit_user` FOREIGN KEY (`competition_submit_user_id`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_competition_submit`
--

LOCK TABLES `sigma_competition_submit` WRITE;
/*!40000 ALTER TABLE `sigma_competition_submit` DISABLE KEYS */;
/*!40000 ALTER TABLE `sigma_competition_submit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_message`
--

DROP TABLE IF EXISTS `sigma_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_message` (
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_message`
--

LOCK TABLES `sigma_message` WRITE;
/*!40000 ALTER TABLE `sigma_message` DISABLE KEYS */;
INSERT INTO `sigma_message` VALUES (1,'test1','【系统消息】','test1离开了聊天室!','2013-05-21 09:48:42',0,NULL,NULL,NULL),(2,'test1','【系统消息】','test1进入了聊天室!','2013-05-21 09:49:17',0,NULL,NULL,NULL),(3,'test1','【系统消息】','test1离开了聊天室!','2013-05-21 09:49:20',0,NULL,NULL,NULL),(4,'test1','【系统消息】','test1进入了聊天室!','2013-05-21 09:49:28',0,NULL,NULL,NULL),(5,'test1','所有人','哈哈，一起聊天呀','2013-05-21 09:49:43',0,NULL,NULL,NULL),(6,'test1','【系统消息】','test1离开了聊天室!','2013-05-21 09:52:20',0,NULL,NULL,NULL),(7,'test2','【系统消息】','test2进入了聊天室!','2013-05-21 09:52:59',0,NULL,NULL,NULL),(8,'test1','【系统消息】','test1离开了聊天室!','2013-05-21 09:53:34',0,NULL,NULL,NULL),(9,'test1','【系统消息】','test1进入了聊天室!','2013-05-21 09:53:38',0,NULL,NULL,NULL),(10,'test1','所有人','来一起聊天呀','2013-05-21 09:53:48',0,NULL,NULL,NULL),(11,'test2','所有人','好啊，，你想聊些什么呀。。哈哈','2013-05-21 09:54:01',0,NULL,NULL,NULL),(12,'test1','所有人','就聊一些普普通通的咯','2013-05-21 09:54:22',0,NULL,NULL,NULL),(13,'test2','【系统消息】','test2离开了聊天室!','2013-05-21 09:56:33',0,NULL,NULL,NULL),(14,'test2','【系统消息】','test2进入了聊天室!','2013-05-21 09:56:38',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `sigma_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_npc`
--

DROP TABLE IF EXISTS `sigma_npc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_npc` (
  `npc_id` int(11) NOT NULL,
  `npc_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`npc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_npc`
--

LOCK TABLES `sigma_npc` WRITE;
/*!40000 ALTER TABLE `sigma_npc` DISABLE KEYS */;
INSERT INTO `sigma_npc` VALUES (1,'npc1');
/*!40000 ALTER TABLE `sigma_npc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_task`
--

DROP TABLE IF EXISTS `sigma_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_task` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_type` int(1) NOT NULL DEFAULT '0',
  `task_problem_id` int(11) DEFAULT NULL,
  `task_name` varchar(45) NOT NULL,
  `task_pretask` int(11) NOT NULL DEFAULT '0',
  `npc_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `task_prerequisite_idx` (`task_pretask`),
  KEY `task_npc_idx` (`npc_id`),
  CONSTRAINT `task_prerequisite` FOREIGN KEY (`task_pretask`) REFERENCES `sigma_task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT ` task_npc_idx ` FOREIGN KEY (`npc_id`) REFERENCES `sigma_npc` (`npc_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_task`
--

LOCK TABLES `sigma_task` WRITE;
/*!40000 ALTER TABLE `sigma_task` DISABLE KEYS */;
INSERT INTO `sigma_task` VALUES (1,0,1,'10000',1,1),(2,0,2,'20000',1,1);
/*!40000 ALTER TABLE `sigma_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_user`
--

DROP TABLE IF EXISTS `sigma_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_password` varchar(45) NOT NULL,
  `user_username` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_username_UNIQUE` (`user_username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_user`
--

LOCK TABLES `sigma_user` WRITE;
/*!40000 ALTER TABLE `sigma_user` DISABLE KEYS */;
INSERT INTO `sigma_user` VALUES (1,'test1','test1'),(2,'test2','test2'),(3,'test3','test3'),(4,'test4','test4');
/*!40000 ALTER TABLE `sigma_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_user_competition`
--

DROP TABLE IF EXISTS `sigma_user_competition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_user_competition` (
  `user_competition_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_competition_user_id` int(11) DEFAULT NULL,
  `user_competition_indentify` int(1) DEFAULT NULL,
  `user_competition_group` int(1) DEFAULT NULL,
  PRIMARY KEY (`user_competition_id`),
  KEY `user_idx` (`user_competition_user_id`),
  CONSTRAINT `user` FOREIGN KEY (`user_competition_user_id`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_user_competition`
--

LOCK TABLES `sigma_user_competition` WRITE;
/*!40000 ALTER TABLE `sigma_user_competition` DISABLE KEYS */;
/*!40000 ALTER TABLE `sigma_user_competition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_user_online`
--

DROP TABLE IF EXISTS `sigma_user_online`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_user_online` (
  `online_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `online_time_now` datetime DEFAULT NULL,
  `online_from_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_user_online`
--

LOCK TABLES `sigma_user_online` WRITE;
/*!40000 ALTER TABLE `sigma_user_online` DISABLE KEYS */;
INSERT INTO `sigma_user_online` VALUES ('test1','2013-05-21 09:53:37','2013-05-21 09:53:37'),('test2','2013-05-21 09:56:37','2013-05-21 09:56:37');
/*!40000 ALTER TABLE `sigma_user_online` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sigma_user_task`
--

DROP TABLE IF EXISTS `sigma_user_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sigma_user_task` (
  `user_task_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_task_task_id` int(11) NOT NULL,
  `user_task_user_id` int(11) NOT NULL,
  `user_task_status` int(1) NOT NULL,
  PRIMARY KEY (`user_task_id`),
  KEY `user_task_idx` (`user_task_user_id`),
  KEY `task_id_idx` (`user_task_task_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_task_user_id`) REFERENCES `sigma_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `task_id` FOREIGN KEY (`user_task_task_id`) REFERENCES `sigma_task` (`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sigma_user_task`
--

LOCK TABLES `sigma_user_task` WRITE;
/*!40000 ALTER TABLE `sigma_user_task` DISABLE KEYS */;
INSERT INTO `sigma_user_task` VALUES (1,1,1,0),(2,2,1,0);
/*!40000 ALTER TABLE `sigma_user_task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-05-23 10:30:15
