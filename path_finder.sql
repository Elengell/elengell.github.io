-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Май 10 2016 г., 22:28
-- Версия сервера: 5.6.26
-- Версия PHP: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `path_finder`
--

-- --------------------------------------------------------

--
-- Структура таблицы `routes`
--

CREATE TABLE IF NOT EXISTS `routes` (
  `id` int(11) NOT NULL,
  `path_id` int(11) NOT NULL,
  `path_name` varchar(50) NOT NULL,
  `path` text NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `routes`
--

INSERT INTO `routes` (`id`, `path_id`, `path_name`, `path`, `comment`) VALUES
(1, 21, 'Ð´Ð¾ Ð¼ÐµÐ´Ð²ÐµÐ´ÐºÐ¸', '[{"lat":53.00964510727678,"lng":36.136415004730225},{"lat":53.01107816724016,"lng":36.13802433013916},{"lat":53.01212388366942,"lng":36.13894701004028},{"lat":53.01369886553111,"lng":36.14150047302246},{"lat":53.013944144418595,"lng":36.14147901535034},{"lat":53.01744244416965,"lng":36.14731550216675},{"lat":53.01799749887138,"lng":36.14722967147827},{"lat":53.018552546432865,"lng":36.14877462387085},{"lat":53.018488006385596,"lng":36.14971876144409},{"lat":53.019055955488255,"lng":36.15347385406494},{"lat":53.020269276251994,"lng":36.15497589111328},{"lat":53.021030811216974,"lng":36.15658521652222}]', 'Ñ‡ÑƒÑ‚ÑŒ-Ñ‡ÑƒÑ‚ÑŒ'),
(1, 23, 'asdfffffff', '[{"lat":53.070102087473266,"lng":36.09283447265625},{"lat":52.99081725338498,"lng":36.338653564453125},{"lat":52.897305557023515,"lng":36.231536865234375},{"lat":52.92546307943839,"lng":35.945892333984375},{"lat":53.0568980694453,"lng":35.88958740234375},{"lat":53.00486789706824,"lng":35.728912353515625},{"lat":52.89564866211354,"lng":35.71929931640625}]', 'xzcvxcvbxcvb sdf adsf dsffwergfd adfg fgwergwrfg werwytwhyhy asgf srgrtherhertb wregwerg wergtheythje wregwergwery wgwthwtrhw gweywywrg werfg wergwery wg whg wrt wrtywrgw gwrgw rgwy wregw rewgt'),
(1, 25, 'qwer', '[{"lat":53.060199453400976,"lng":36.1505126953125},{"lat":52.919667438765075,"lng":36.2933349609375},{"lat":52.86664274600413,"lng":36.10382080078125},{"lat":52.92629096477687,"lng":35.80718994140625},{"lat":53.05359643250982,"lng":35.782470703125},{"lat":53.08660141878404,"lng":35.929412841796875}]', 'sdfgsdfg'),
(1, 28, 'fghfgh', '[{"lat":53.055247282600575,"lng":36.156005859375},{"lat":52.88653460775681,"lng":36.2933349609375},{"lat":52.97676203722087,"lng":36.555633544921875},{"lat":53.09319938092189,"lng":36.607818603515625},{"lat":53.02387031460975,"lng":36.706695556640625}]', 'fgjfgjfgjfgfgj'),
(1, 29, 'Ð±Ð¾Ð»ÑŒÑˆÐ°Ñ ÑˆÑ‚ÑƒÐºÐ°', '[{"lat":59.57885104663186,"lng":42.36328125},{"lat":57.39762405500045,"lng":49.5263671875},{"lat":53.69670647530323,"lng":50.9326171875},{"lat":54.162433968067816,"lng":56.865234375},{"lat":58.90464570302001,"lng":60.3369140625},{"lat":60.60854176060904,"lng":53.0419921875},{"lat":61.56457388515459,"lng":41.3525390625},{"lat":58.92733441827545,"lng":31.552734375},{"lat":56.92099675839107,"lng":31.1572265625},{"lat":55.05320258537112,"lng":36.9140625},{"lat":52.5095347703273,"lng":45.3955078125},{"lat":50.3734961443035,"lng":47.2412109375}]', 'Ð±Ð¾Ð»ÑŒÑˆÐ°Ñ ÑˆÑ‚ÑƒÐºÐ°');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `login`, `password`) VALUES
(1, 'ell', 'ell', '00fe5ef03571e028fc55bfb1ad49930c'),
(2, '123', '123', '202cb962ac59075b964b07152d234b70'),
(6, 'qwerty', 'qwerty', 'd8578edf8458ce06fbc5bb76a58c5ca4');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `routes`
--
ALTER TABLE `routes`
  ADD UNIQUE KEY `path_id` (`path_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `routes`
--
ALTER TABLE `routes`
  MODIFY `path_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
