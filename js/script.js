$(document).ready(function() {
	
	$("#slcTipo").blur(function() {
		
		if ($(this).find(":selected").val() != "") {
			
			$("#slcMarca").html('<option value="">SELECIONE..</option>');
			
			$.getJSON("https://parallelum.com.br/fipe/api/v1/" + $(this).find(":selected").val() + "/marcas", function(dados) {
				
				var itens = JSON.parse(JSON.stringify(dados));
				
				for (var i = 0; i < itens.length; i++) {
					$("#slcMarca").append($("<option/>").val(itens[i].codigo).text(itens[i].nome.toUpperCase()));
				}
				
				$("#slcMarca").prop("disabled", false);
				
			});
			
		} else {
			
			Swal.fire({
				title: "Oops!",
				text: "Selecione o tipo de veículo!",
				icon: "error"
			});
			
		}
		
	});
	
	$("#slcMarca").blur(function() {
		
		if ($(this).find(":selected").val() != "") {
			
			$("#slcModelo").html('<option value="">SELECIONE..</option>');
			
			$.getJSON("https://parallelum.com.br/fipe/api/v1/" + $("#slcTipo").find(":selected").val() + "/marcas/" + $(this).find(":selected").val() + "/modelos", function(dados) {
				
				var itens = JSON.parse(JSON.stringify(dados.modelos));
				
				for (var i = 0; i < itens.length; i++) {
					$("#slcModelo").append($("<option/>").val(itens[i].codigo).text(itens[i].nome.toUpperCase()));
				}
				
				$("#slcModelo").prop("disabled", false);
				
			});
			
		} else {
			
			Swal.fire({
				title: "Oops!",
				text: "Selecione a marca do veículo!",
				icon: "error"
			});
			
		}
		
	});
	
	$("#slcModelo").blur(function() {
		
		if ($(this).find(":selected").val() != "") {
			
			$("#slcAno").html('<option value="">SELECIONE..</option>');
			
			$.getJSON("https://parallelum.com.br/fipe/api/v1/" + $("#slcTipo").find(":selected").val() + "/marcas/" + $("#slcMarca").find(":selected").val() + "/modelos/" + $(this).find(":selected").val() + "/anos", function(dados) {
				
				var itens = JSON.parse(JSON.stringify(dados));
				
				for (var i = 0; i < itens.length; i++) {
					$("#slcAno").append($("<option/>").val(itens[i].codigo).text(itens[i].nome.toUpperCase()));
				}
				
				$("#slcAno").prop("disabled", false);
				
			});
			
		} else {
			
			Swal.fire({
				title: "Oops!",
				text: "Selecione o modelo do veículo!",
				icon: "error"
			});
			
		}
		
	});
	
	$("#slcAno").blur(function() {
		
		if ($(this).find(":selected").val() != "") {
			
			$.getJSON("https://parallelum.com.br/fipe/api/v1/" + $("#slcTipo").find(":selected").val() + "/marcas/" + $("#slcMarca").find(":selected").val() + "/modelos/" + $("#slcModelo").find(":selected").val() + "/anos/" + $(this).find(":selected").val(), function(dados) {
				
				var itens = JSON.parse(JSON.stringify(dados));
				
				$("#txtMesRef").val(dados.MesReferencia.toUpperCase());
				$("#txtPreco").val(dados.Valor);
				$("#txtIpva").val(calcularIpva(dados.Valor));
				
			});
			
		} else {
			
			Swal.fire({
				title: "Oops!",
				text: "Selecione o ano do veículo!",
				icon: "error"
			});
			
		}
		
	});
	
	$("#btnLimpar").on("click", function() {
		
		$("#slcTipo").val("");
		$("#slcMarca").prop("disabled", true);
		$("#slcMarca").html('<option value="">SELECIONE..</option>');
		$("#slcModelo").prop("disabled", true);
		$("#slcModelo").html('<option value="">SELECIONE..</option>');
		$("#slcAno").prop("disabled", true);
		$("#slcAno").html('<option value="">SELECIONE..</option>');
		$("#txtMesRef").val("");
		$("#txtPreco").val("");
		$("#txtIpva").val("");
		
	});
	
});

/**
 * Função responsável pelo cálculo do IPVA dos veículos.
 */
function calcularIpva(valorVeiculo) {
	return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valorVeiculo.replace(/[^0-9]+/g, "").replace("00", "")) * 0.04);
}