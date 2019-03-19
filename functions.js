$(function () {
  var operation = "C";
  var selected_index = -1;
  var tblPersons = localStorage.getItem("tblPersons");
  tblPersons = JSON.parse(tblPersons);
  if (tblPersons === null)
      tblPersons = [];
  function Create() {
    var person = JSON.stringify({
      Nome: $("#txtNome").val(),
      Telefone: $("#txtTelefone").val(),
      Ranking: $("#txtRanking").val()
    }); 
    tblPersons.push(person);
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Os dados foram armazenados");
    return true;
  }
  function Edit() {
    tblPersons[selected_index] = JSON.stringify({
      Nome: $("#txtNome").val(),
      Telefone: $("#txtTelefone").val(),
      Ranking: $("#txtRanking").val(),
    });
    
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Os dados foram armazenados");
    return true;
  }

  function Delete() {
  
    tblPersons.splice(selected_index, 1); 
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Nome excluido");
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Nome</th>" +
            "<th>Telefone</th>" +
            "<th>Ranking</th>" +
            "<th>Ação</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); 
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Nome + "</td>" +
                "<td>" + per.Telefone + "</td>" +
                "<td>" + per.Ranking + "</td>" +                    
                "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    }
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  });

  List();

  $(".btnEdit").bind("click", function () {
    operation = "E";
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#txtNome").val(per.Nome);
    $("#txtTelefone").val(per.Telefone);
    $("#txtRanking").val(per.Ranking);
    $("#txtNome").focus();
  });
  $(".btnDelete").bind("click", function () {
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete();
    List(); 
  });
});
