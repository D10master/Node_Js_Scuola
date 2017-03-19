CREATE TABLE IF NOT EXISTS `studenti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `mail` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
  );
INSERT INTO `studenti` (`id`, `nome`, `cognome`, `mail`) VALUES
(2, 'Nadya', 'Eka', 'nadya@yahoo.com'),
(3, 'Amali', 'Gina','lia@langit.com'),
(4, 'Angel ', 'Pang', 'angel@gmail.com'),
(5, 'Ujang', 'Jill', 'ujang@gmail.com'),
(6, 'Memet', 'Blok', 'memet@ongkek.com'),
(9, 'Agung', 'Peter', 'agung@yahoo.com'),
(10, 'Jhon', 'Paris', 'jtaylor@yahoo.com');
