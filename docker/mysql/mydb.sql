-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2021 at 08:18 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountlevel`
--

CREATE TABLE `accountlevel` (
  `idAccountLevel` int(11) NOT NULL,
  `Name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accountlevel`
--

INSERT INTO `accountlevel` (`idAccountLevel`, `Name`) VALUES
(3, 'User'),
(4, 'Tutor'),
(5, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `idAnswers` int(11) NOT NULL,
  `Question_idQuestion` int(11) NOT NULL,
  `Description` longtext DEFAULT NULL,
  `Truth` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`idAnswers`, `Question_idQuestion`, `Description`, `Truth`) VALUES
(1, 1, 'Vorstand', 1),
(2, 1, 'CFO', 1),
(3, 1, 'Controller', 1),
(4, 1, 'treseur', 1),
(5, 2, 'Steuern', 1),
(6, 4, 'Auszahlung', 0),
(7, 4, 'Einzahlung', 0),
(9, 4, 'Steuern', 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `idcategory` int(11) NOT NULL,
  `Subject_idSubject` int(11) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `Creator_idUser` int(11) NOT NULL,
  `CreateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`idcategory`, `Subject_idSubject`, `Name`, `Creator_idUser`, `CreateDate`) VALUES
(1, 1, 'Kapitel 1', 1, '2021-12-05 13:29:33');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `idQuestion` int(11) NOT NULL,
  `category_idcategory` int(11) NOT NULL,
  `QuestionDescription` longtext DEFAULT NULL,
  `Creator_idUser` int(11) NOT NULL,
  `Approved` tinyint(4) DEFAULT NULL,
  `Approver_idUser` int(11) NOT NULL,
  `CreateDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`idQuestion`, `category_idcategory`, `QuestionDescription`, `Creator_idUser`, `Approved`, `Approver_idUser`, `CreateDate`) VALUES
(1, 1, 'Rollen im finanzmanagement', 1, 1, 1, '2021-12-06 00:00:16'),
(2, 1, 'Aufgaben controller', 1, 1, 1, '2021-12-06 00:03:29'),
(4, 1, 'Aufgaben vom treasuer', 1, NULL, 1, '2021-12-07 15:06:09'),
(8, 1, 'Aufgaben vom treasuer', 1, NULL, 1, '2021-12-07 15:18:56');

-- --------------------------------------------------------

--
-- Table structure for table `question_has_rounds`
--

CREATE TABLE `question_has_rounds` (
  `Question_idQuestion` int(11) NOT NULL,
  `Rounds_idRounds` int(11) NOT NULL,
  `User_idUser` int(11) NOT NULL,
  `Answers_idAnswers` int(11) NOT NULL,
  `Score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `idQuiz` int(11) NOT NULL,
  `PlayDate` datetime DEFAULT NULL,
  `Subject_idSubject` int(11) NOT NULL,
  `Creator_idUser` int(11) NOT NULL,
  `Joiner_idUser1` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `rounds`
--

CREATE TABLE `rounds` (
  `idRounds` int(11) NOT NULL,
  `Quiz_idQuiz` int(11) NOT NULL,
  `category_idcategory` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `idSubject` int(11) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `Creator_idUser` int(11) NOT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `ShortName` varchar(45) DEFAULT NULL,
  `Active` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`idSubject`, `Name`, `Creator_idUser`, `CreateDate`, `ShortName`, `Active`) VALUES
(1, 'Externe Burchhaltung', 1, '2021-12-05 13:12:17', 'BFIN', 1),
(3, 'Interne Buchhaltung', 1, '2021-12-05 13:17:19', 'BKLR', 1),
(5, 'Software', 10, '2021-12-09 05:32:01', 'esfs', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `FirstName` varchar(70) DEFAULT NULL,
  `LastName` varchar(70) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `AccountLevel_idAccountLevel` int(11) NOT NULL,
  `Lastupdated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`idUser`, `FirstName`, `LastName`, `Email`, `Password`, `CreateDate`, `Status`, `AccountLevel_idAccountLevel`, `Lastupdated`) VALUES
(1, 'Leon', 'Schönenberger', 'Leon.schoenenberger@iubh-fernstudium.de', '$2y$10$PQqM6YdQE8ekEaG74GLW8uB29VVskG6EjYe.lpUcUHTZllnhbNJhm', '2021-12-05 18:20:14', 0, 3, '2021-12-09 13:02:41'),
(5, 'Dominik', 'Vogt', 'dominik.vogt@iubh-fernstudium.de', '124343123124123412', NULL, 0, 3, '2021-12-05 12:57:35'),
(10, 'Leon', 'Privat', 'leon.schoenenberger@gmx.ch', '$2y$10$bTSJ8uSCLEol2eOEic3YQudNpxCPAxMkOG3DaHaMMWHVXnFuvtCXO', '2021-12-08 01:34:04', 0, 5, NULL),
(11, 'Nicolai', 'Rasch', 'Nicolai.Rasch@iubh-fernstudium.de', '$2y$10$2eTbN.kvVM5ryv/0bh7Cj.fzS/maOeuq/4904cdip0f2YNvsbKSOO', '2021-12-09 12:50:38', 0, 4, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountlevel`
--
ALTER TABLE `accountlevel`
  ADD PRIMARY KEY (`idAccountLevel`);

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`idAnswers`,`Question_idQuestion`),
  ADD KEY `fk_Answers_Question_idx` (`Question_idQuestion`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idcategory`,`Subject_idSubject`,`Creator_idUser`),
  ADD KEY `fk_category_Subject1_idx` (`Subject_idSubject`),
  ADD KEY `fk_category_User1_idx` (`Creator_idUser`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`idQuestion`,`category_idcategory`,`Creator_idUser`,`Approver_idUser`),
  ADD KEY `fk_Question_category1_idx` (`category_idcategory`),
  ADD KEY `fk_Question_User1_idx` (`Creator_idUser`),
  ADD KEY `fk_Question_User2_idx` (`Approver_idUser`);

--
-- Indexes for table `question_has_rounds`
--
ALTER TABLE `question_has_rounds`
  ADD PRIMARY KEY (`Question_idQuestion`,`Rounds_idRounds`,`User_idUser`,`Answers_idAnswers`),
  ADD KEY `fk_Question_has_Rounds_Rounds1_idx` (`Rounds_idRounds`),
  ADD KEY `fk_Question_has_Rounds_Question1_idx` (`Question_idQuestion`),
  ADD KEY `fk_Question_has_Rounds_User1_idx` (`User_idUser`),
  ADD KEY `fk_Question_has_Rounds_Answers1_idx` (`Answers_idAnswers`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`idQuiz`,`Subject_idSubject`,`Creator_idUser`,`Joiner_idUser1`),
  ADD KEY `fk_Quiz_Subject1_idx` (`Subject_idSubject`),
  ADD KEY `fk_Quiz_User1_idx` (`Creator_idUser`),
  ADD KEY `fk_Quiz_User2_idx` (`Joiner_idUser1`);

--
-- Indexes for table `rounds`
--
ALTER TABLE `rounds`
  ADD PRIMARY KEY (`idRounds`,`Quiz_idQuiz`,`category_idcategory`),
  ADD KEY `fk_Rounds_Quiz1_idx` (`Quiz_idQuiz`),
  ADD KEY `fk_Rounds_category1_idx` (`category_idcategory`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`idSubject`,`Creator_idUser`),
  ADD KEY `fk_Subject_User1_idx` (`Creator_idUser`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`,`AccountLevel_idAccountLevel`),
  ADD KEY `fk_User_AccountLevel1_idx` (`AccountLevel_idAccountLevel`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountlevel`
--
ALTER TABLE `accountlevel`
  MODIFY `idAccountLevel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `idAnswers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `idcategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `idQuestion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `idQuiz` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rounds`
--
ALTER TABLE `rounds`
  MODIFY `idRounds` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `idSubject` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `fk_Answers_Question` FOREIGN KEY (`Question_idQuestion`) REFERENCES `question` (`idQuestion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `fk_category_Subject1` FOREIGN KEY (`Subject_idSubject`) REFERENCES `subject` (`idSubject`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_category_User1` FOREIGN KEY (`Creator_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `fk_Question_User1` FOREIGN KEY (`Creator_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Question_User2` FOREIGN KEY (`Approver_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Question_category1` FOREIGN KEY (`category_idcategory`) REFERENCES `category` (`idcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question_has_rounds`
--
ALTER TABLE `question_has_rounds`
  ADD CONSTRAINT `fk_Question_has_Rounds_Answers1` FOREIGN KEY (`Answers_idAnswers`) REFERENCES `answers` (`idAnswers`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Question_has_Rounds_Question1` FOREIGN KEY (`Question_idQuestion`) REFERENCES `question` (`idQuestion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Question_has_Rounds_Rounds1` FOREIGN KEY (`Rounds_idRounds`) REFERENCES `rounds` (`idRounds`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Question_has_Rounds_User1` FOREIGN KEY (`User_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `fk_Quiz_Subject1` FOREIGN KEY (`Subject_idSubject`) REFERENCES `subject` (`idSubject`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Quiz_User1` FOREIGN KEY (`Creator_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Quiz_User2` FOREIGN KEY (`Joiner_idUser1`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `rounds`
--
ALTER TABLE `rounds`
  ADD CONSTRAINT `fk_Rounds_Quiz1` FOREIGN KEY (`Quiz_idQuiz`) REFERENCES `quiz` (`idQuiz`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Rounds_category1` FOREIGN KEY (`category_idcategory`) REFERENCES `category` (`idcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `fk_Subject_User1` FOREIGN KEY (`Creator_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_User_AccountLevel1` FOREIGN KEY (`AccountLevel_idAccountLevel`) REFERENCES `accountlevel` (`idAccountLevel`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
