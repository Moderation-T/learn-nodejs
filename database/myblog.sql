/*
 Navicat Premium Data Transfer

 Source Server         : learn-nodejs
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : myblog

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 03/07/2020 14:56:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `content` longtext NOT NULL COMMENT '文章内容',
  `createtime` bigint NOT NULL COMMENT '创建时间',
  `author` varchar(255) NOT NULL COMMENT '作者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blogs
-- ----------------------------
BEGIN;
INSERT INTO `blogs` VALUES (1, 'title1', 'content1111', 123456432, 'author1111');
INSERT INTO `blogs` VALUES (2, 'title2', 'content2222', 2222222, 'author2222');
INSERT INTO `blogs` VALUES (4, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (5, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (6, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (7, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (8, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (10, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (11, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (12, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (13, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (14, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (15, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (16, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (17, 'title2222', 'content2222', 212212222, 'author2222');
INSERT INTO `blogs` VALUES (18, '111', '222', 12349867456456, 'zhangwu');
INSERT INTO `blogs` VALUES (19, '23423434', '234234234', 12349867456456, 'zhangwu');
INSERT INTO `blogs` VALUES (20, 'new router', 'new blog', 12349867456456, 'zhangwu');
INSERT INTO `blogs` VALUES (21, '666', '666666', 12349867456456, 'zhangwu');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '唯一主键',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `realname` varchar(255) NOT NULL COMMENT '真实姓名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (18, 'zhangsan', '4d4994bde299f6168c65f24c852897b7', '张三');
INSERT INTO `users` VALUES (20, 'zhangwu', '524ab85686df0e52ada43b11b53cce35', '张五');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
