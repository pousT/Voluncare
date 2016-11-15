
<?php
    $servername = "localhost";
    $username = "zy16373";
    $password = "Soup19961217twbb";
    $name=$pw="";
    // Create connection
    $db = mysqli_connect($servername, $username, $password);

    // Check connection
    if (!$db) {
      die("Cannot sign up now, please try it again in a mininute " . mysqli_connect_error()) . " <br/>";
    }
    mysqli_select_db( $db, "db_zy16373");
    $query = mysqli_prepare($db, "INSERT INTO Users (uTelNom, uName,uPassword, uAddress, uBirthday, uGender) VALUES (?, ?, ?, ?, ?, ?)");

    mysqli_stmt_bind_param($query, "ssssss", ,$telephone, $name, $pw, $address, $birthday, $gender);
    
    $name = $_POST["name"];
    $pw = $_POST["pw"];
    $telephone = $_POST["telephone"];
    $address = $_POST["address"];
    $birthday = $_POST["birthday"];
    $gender = $_POST["gender"];
    $name= test_input($name);
    $pw = test_input($pw);
    $valid = (!empty($name)) 
            && (!empty($pw));
    if($valid)
    {
        mysqli_stmt_execute($query);    
        echo "1"; 
    }
    else
    {
        echo "Opps, something wrong with your request, please check your information and send request again.";
        
    }
    mysqli_close($db);

    function test_input($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }

    ?>