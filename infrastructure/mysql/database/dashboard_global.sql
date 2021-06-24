-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: dashboard
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `global`
--

DROP TABLE IF EXISTS `global`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `global` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NewConfirmed` varchar(30) NOT NULL,
  `TotalConfirmed` varchar(30) NOT NULL,
  `NewDeaths` varchar(30) DEFAULT NULL,
  `TotalDeaths` varchar(30) DEFAULT NULL,
  `NewRecovered` varchar(30) DEFAULT NULL,
  `TotalRecovered` varchar(30) DEFAULT NULL,
  `Data` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `global`
--

LOCK TABLES `global` WRITE;
/*!40000 ALTER TABLE `global` DISABLE KEYS */;
INSERT INTO `global` VALUES (1,'218909','109362998','7837','2416869','117132','61571020','2021-02-17T19:11:57.352Z'),(2,'343870','109487959','10328','2419360','224056','61677944','2021-02-18T05:48:47.964Z'),(3,'247025','110160811','8313','2439655','113341','62101472','2021-02-19T11:35:39.327Z'),(4,'289157','110579419','8070','2450199','116888','62332786','2021-02-20T14:50:06.138Z'),(5,'228990','110927825','6100','2458577','161251','62601946','2021-02-21T11:13:59.028Z'),(6,'181741','111219128','3897','2464275','101048','62819171','2021-02-22T08:26:42.773Z'),(7,'285804','111390351','5738','2467000','193099','62911222','2021-02-23T03:10:15.589Z'),(8,'239363','111962729','8113','2483442','162628','63280285','2021-02-24T09:42:20.564Z'),(9,'380358','112103724','11034','2486363','260692','63378349','2021-02-25T03:18:59.753Z'),(10,'402132','112547616','10987','2497865','208134','63593329','2021-02-26T03:26:38.281Z'),(11,'411833','112993202','9700','2507945','228099','63829074','2021-02-27T03:22:40.643Z'),(12,'398261','113395725','9575','2517600','249582','64082534','2021-02-28T03:22:53.642Z'),(13,'346228','113747018','7398','2525058','243604','64335671','2021-03-01T03:07:20.084Z'),(14,'273889','114092751','5286','2531228','147459','64485924','2021-03-02T02:55:47.197Z'),(15,'221922','114676033','7444','2547184','157650','64888250','2021-03-03T10:00:01.426Z'),(16,'250539','115015469','8064','2557625','125120','65117612','2021-03-04T10:43:15.65Z'),(17,'406349','115171279','10460','2560021','232558','65225050','2021-03-05T03:15:40.473Z'),(18,'419170','115619777','9364','2569746','243423','65473893','2021-03-06T00:54:24.334Z'),(19,'436257','116351396','7810','2585919','236478','65830645','2021-03-07T00:40:08.838Z'),(20,'389096','116472987','7248','2587569','234360','65940399','2021-03-08T03:29:16.469Z'),(21,'336808','116808818','5650','2593417','227119','66171197','2021-03-09T03:14:50.697Z'),(22,'240179','117403899','7132','2608057','136631','66605659','2021-03-10T07:53:23.199Z'),(23,'406369','117570089','9762','2610687','245304','66714332','2021-03-11T02:52:26.87Z'),(24,'440437','118126619','9393','2620392','246606','66966557','2021-03-12T03:18:23.235Z'),(26,'290051','119035188','7024','2637333','143645','67382042','2021-03-13T06:25:56.283Z'),(27,'291729','119036866','7059','2637368','143645','67382042','2021-03-13T20:15:47.712Z'),(28,'450261','119195398','9315','2639624','272771','67511168','2021-03-14T05:05:54.805Z'),(29,'194487','119720249','3480','2651562','102497','67880290','2021-03-15T10:05:57.7Z'),(30,'199403','120062685','4122','2658360','167407','68170119','2021-03-16T09:51:23.318Z'),(31,'276799','120541141','6742','2668353','151007','68436545','2021-03-17T10:56:14.153Z'),(32,'304996','121041121','7149','2678340','155904','68701013','2021-03-18T10:39:59.696Z'),(33,'320126','121629168','7388','2688928','147535','68970015','2021-03-19T08:37:08.585Z'),(34,'325183','122157451','7267','2699337','153926','69249037','2021-03-20T11:03:13.025Z'),(35,'280879','122653240','5595','2707515','120155','69507108','2021-03-21T09:54:46.429Z'),(36,'228090','123046516','3715','2713158','122419','69785799','2021-03-22T09:54:19.246Z'),(37,'231292','123517783','4561','2720855','196159','70121782','2021-03-23T10:06:41.428Z'),(38,'325641','124041154','7762','2731975','168441','70434873','2021-03-24T10:00:33.661Z'),(39,'351310','124612800','6164','2741369','190861','70769144','2021-03-25T10:06:05.661Z'),(40,'387965','125327333','8110','2753057','171721','71080895','2021-03-26T09:57:10.512Z'),(41,'375969','125968663','8480','2765389','195273','71445422','2021-03-27T10:03:13.662Z'),(42,'348478','126561354','6833','2775198','164426','71751832','2021-03-28T10:04:13.787Z'),(43,'169156','126949350','3888','2781346','126445','72046963','2021-03-29T09:56:55.356Z'),(44,'206960','127418804','4873','2789552','132267','72383533','2021-03-30T09:28:28.492Z'),(45,'262862','127989578','7813','2801199','169845','72714682','2021-03-31T09:20:53.339Z'),(46,'311637','128652155','8053','2812987','189683','73052722','2021-04-01T09:23:32.28Z'),(47,'406742','129436904','8184','2825356','190595','73434614','2021-04-02T09:28:32.99Z'),(48,'344279','130062837','6758','2835490','161393','73746979','2021-04-03T09:29:58.251Z'),(49,'321819','130595653','5555','2843937','194875','74111339','2021-04-04T09:23:42.153Z'),(50,'269224','131147323','3744','2850788','135834','74456788','2021-04-05T09:17:20.957Z'),(51,'296774','131636103','4380','2858341','170027','74800808','2021-04-06T09:11:31.453Z'),(52,'377773','132240468','8381','2870219','195300','75167340','2021-04-07T09:26:37.91Z'),(53,'435743','132923562','10720','2885060','309592','75647154','2021-04-08T09:22:21.581Z'),(54,'837912','133761474','14624','2899684','446482','76093636','2021-04-09T09:19:54.877Z'),(55,'477416','134512438','9280','2913171','237931','76489199','2021-04-10T09:19:14.423Z'),(56,'423842','135170531','8692','2925572','198220','76871079','2021-04-11T09:17:20.798Z'),(57,'353537','135859878','4932','2934125','303129','77399130','2021-04-12T09:24:24.76Z'),(58,'387473','136475315','5581','2943416','197702','77790708','2021-04-13T21:23:17.22Z'),(59,'492516','137253707','9012','2956829','268636','78274229','2021-04-14T09:17:20.159Z'),(60,'505190','138069089','8808','2970350','251119','78717946','2021-04-15T09:20:06.556Z'),(61,'293085','138666245','7334','2982352','128658','79040597','2021-04-16T09:20:39.309Z'),(62,'324818','139502029','7480','2995088','172498','79536570','2021-04-17T09:19:19.711Z'),(63,'256140','140261916','6837','3006930','160677','80036293','2021-04-18T09:27:15.888Z'),(64,'446611','141207386','5367','3017041','306178','80751745','2021-04-19T09:25:49.738Z'),(65,'267467','142450378','7412','3039623','192398','81717256','2021-04-21T09:15:19.732Z'),(66,'287274','143326045','7354','3053735','294716','82393600','2021-04-22T09:14:53.624Z'),(67,'616991','144537763','8902','3069518','391019','83103790','2021-04-23T09:15:14.798Z'),(68,'279520','145087819','6938','3081201','179092','83519253','2021-04-24T09:29:17.865Z'),(69,'241026','145904373','6688','3094366','139111','84098888','2021-04-25T09:25:16.347Z'),(70,'528489','146980582','6547','3106935','101685','84633512','2021-04-26T09:21:34.406Z'),(71,'499291','147661942','7029','3118058','467190','85539987','2021-04-27T09:15:41.917Z'),(72,'610701','148504841','10071','3132616','469051','86220432','2021-04-28T09:11:22.661Z'),(73,'661727','149407874','11257','3148318','408291','86817042','2021-04-29T09:10:57.416Z'),(74,'517476','152646901','7187','3200146','454129','89584582','2021-05-03T21:43:28.461Z'),(75,'521200','153326436','7555','3211256','462416','90227962','2021-05-04T21:36:27.903Z'),(76,'610153','154132100','10305','3225207','465256','90884799','2021-05-05T21:49:23.844Z'),(77,'499241','158089935','6829','3290466','483597','94340009','2021-05-10T22:37:54.976Z'),(78,'475806','158711719','7263','3301279','459798','94972195','2021-05-11T22:23:28.208Z'),(79,'559297','159449997','9724','3314903','582902','95723165','2021-05-12T22:30:08.434Z'),(80,'578959','160208274','10304','3328833','477468','96370674','2021-05-13T22:25:36.299Z'),(81,'552065','160931964','9772','3341958','500813','97060720','2021-05-14T22:21:46.661Z'),(82,'566755','161649883','9797','3355190','499201','97727344','2021-05-15T16:15:18.085Z'),(83,'566755','161648571','9797','3355168','499201','97726055','2021-05-15T16:31:53.236Z'),(84,'177097','178226369','4362','3863549','136302','116417568','2021-06-21T23:35:28.59Z');
/*!40000 ALTER TABLE `global` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-21 22:19:53
