<?php
    include 'conexion.php';
	
	$pdo = new Conexion();
	

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
	header('Access-Control-Max-Age: 86400'); // Cache durante 24 horas

	// Responder a las solicitudes de OPTIONS (pre-vuelo) de CORS
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
		http_response_code(200);
		exit;
	}

	//Listar registros y consultar registro
	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		$sql = $pdo->prepare("SELECT paises.id AS id_pais, paises.nombre AS pais, capitales.nombre AS capital
		FROM paises
		LEFT JOIN capitales ON paises.id = capitales.pais_id ORDER BY id_pais;");
		$sql->execute();
		$sql->setFetchMode(PDO::FETCH_ASSOC);
		header("HTTP/1.1 200 hay datos");
		echo json_encode($sql->fetchAll());
		exit;		
	}
	
	//Insertar registro
	if($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		if(!empty($_POST["id"]))
		{
			$sql = "INSERT INTO capitales (nombre, pais_id) VALUES (:nombre, :id);";
			$stmt = $pdo->prepare($sql);
			$stmt->bindValue(':nombre', $_POST['nombre']);
			$stmt->bindValue(':id', $_POST['id']);
			$stmt->execute();
			$idPost = $pdo->lastInsertId(); 
			if($idPost)
			{
				header("HTTP/1.1 200 Ok");
				echo json_encode($idPost);
				exit;
			}				
			
			} else {
			
				$sql = "INSERT INTO paises (nombre) VALUES (:nombre);";
				$stmt = $pdo->prepare($sql);
				$stmt->bindValue(':nombre', $_POST['nombre']);
				$stmt->execute();
				$idPost = $pdo->lastInsertId(); 
				if($idPost)
				{
					header("HTTP/1.1 200 Ok");
					echo json_encode($idPost);
					exit;
				}	
		}

		
	}
	
	//Actualizar registro
	if($_SERVER['REQUEST_METHOD'] == 'PUT')
	{		
		if(isset($_GET['id']))
		{
			$sql = "UPDATE paises SET nombre = :nombre WHERE id = :id";
			$stmt = $pdo->prepare($sql);
			$stmt->bindValue(':nombre', $_GET['nombre']);
			$stmt->bindValue(':id', $_GET['id']);
			$stmt->execute();
			header("HTTP/1.1 200 Ok");
			exit;
			
		} 
		if(isset($_GET['id_cap'])) {
			$sql = "UPDATE capitales SET nombre = :nombre WHERE pais_id = :id_cap";
			$stmt = $pdo->prepare($sql);
			$stmt->bindValue(':nombre', $_GET['nombre']);
			$stmt->bindValue(':id_cap', $_GET['id_cap']);
			$stmt->execute();
			header("HTTP/1.1 200 Ok");
			exit;
		}
	}
	
	//Eliminar registro
	if($_SERVER['REQUEST_METHOD'] == 'DELETE')
	{
		if(isset($_GET['id']))
		{
			$sql = "DELETE FROM capitales WHERE pais_id = :id; DELETE FROM paises WHERE id = :id;";
			$stmt = $pdo->prepare($sql);
			$stmt->bindValue(':id', $_GET['id']);
			$stmt->execute();
			header("HTTP/1.1 200 Ok");
			exit;	
		}
		if(isset($_GET['id_cap']))
		{
			$sql = "DELETE FROM capitales WHERE pais_id = :id_cap";
			$stmt = $pdo->prepare($sql);
			$stmt->bindValue(':id_cap', $_GET['id_cap']);
			$stmt->execute();
			header("HTTP/1.1 200 Ok");
			exit;			
		}
	}
	
	//Si no corresponde a ninguna opción anterior
	header("HTTP/1.1 400 Bad Request");
?>