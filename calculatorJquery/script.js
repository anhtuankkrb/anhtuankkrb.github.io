var screen = $('#screen');
var toanHang = [];
var bieuThuc = [];

$("#changeDark").click(function(){
	$(".maytinh").addClass('dark');
});
$("#changeLight").click(function(){
	$(".maytinh").removeClass('dark');
});
$(".buttonHistory").click(function(){
	$(".historyScreen").toggle();
});

function setToanHang(){    //Ham dat toan hang vao mang bieu thuc
	let stringTH = toanHang.join('');
	
	if(toanHang.length == 0){   //Su ly truong hop dau ()
		return;
	}
	else if(bieuThuc.length == 1){     //Su ly de tinh voi ket qua  phai ket hop voi trong button
		bieuThuc[0] = Number(stringTH);
		toanHang = [];
	}
	else{
		bieuThuc.push(Number(stringTH));
		toanHang = [];
	}
	
}

function testDauNgoacMO(){
	if(toanHang.length == 0){
		screen.append('('); 
		bieuThuc.push('(');
	}
}

function tesetDauNgoacDong(){
	let m = 0;
	let d = 0;	
	for (let x of bieuThuc){
		if(x === '('){
			m ++;
		}
		else if(x === ')'){
			d ++;
		}
	}
	if(d + 1 <= m){
		setToanHang(); 
		bieuThuc.push(')');
		screen.append(')');
	}
}

function testCham(){
	let d = 0;
	for(let x of toanHang){
		if(x === '.'){
			d++;
		}
	}
	if(d < 1){
		toanHang.push('.');
		screen.append('.');
	}
}
function testDau(dau, kyTu){
	if (toanHang.length != 0 || bieuThuc[bieuThuc.length-1] === ')'){
		setToanHang();
		 bieuThuc.push(dau);
		 if(kyTu == undefined){
		 	kyTu = dau;
		 }
		 screen.append(kyTu);
	}
}

function setDauTru(){  // Su ly truong hop voi so am va dau tru
	if (toanHang[0] === '-'){
		return;
	}
	if(toanHang.length != 0 || bieuThuc[bieuThuc.length-1] === ')'){
		setToanHang();
		bieuThuc.push('-');
		screen.append('-');
	}
	else{
		toanHang.push('-');
		screen.append('-');
	}
}



function getresult(array){   //Ham tinh ket qua bieu thuc 
	let i=0;
	while(i<2){           //Vong lap tinh theo thu tu uu tien
		let dauNgoacMo = -1;
		let dauNgoacDong = array.indexOf(')');
		let dauNhan = array.indexOf('*');
		let dauChia = array.indexOf('/');
		let dauCong = array.indexOf('+');
		let dauTru = array.indexOf('-');
	
		if(dauNgoacDong != -1){     //truong hop dau ngoac, uu tien dau ngoac ben trong
			let mangCon = [];
			dauNgoacMo = array.lastIndexOf('(', dauNgoacDong);
			mangCon = array.slice(dauNgoacMo, dauNgoacDong + 1);
			mangCon.shift();
			mangCon.pop();
			array.splice(dauNgoacMo, dauNgoacDong + 1 - dauNgoacMo, getresult(mangCon)); //Su dung de quy
			
		}
		else if(dauNhan != -1 || dauChia != -1){  //truong hop * /
			if(dauNhan < dauChia && dauNhan != -1 || dauChia == -1){
				array.splice(dauNhan - 1, 3, +(array[dauNhan - 1] * array[dauNhan + 1]).toFixed(15));
			}
			if(dauChia < dauNhan && dauChia != -1 || dauNhan == -1){
				array.splice(dauChia - 1, 3, +(array[dauChia - 1] / array[dauChia + 1]).toFixed(15));
			}
		}
		else if(dauCong != -1 || dauTru != -1){  // truong hop + -
			if(dauCong < dauTru && dauCong != -1 || dauTru == -1){
				array.splice(dauCong - 1, 3, +(array[dauCong - 1] + array[dauCong + 1]).toFixed(15));
			}
			if(dauTru < dauCong && dauTru != -1 || dauCong == -1){
				array.splice(dauTru - 1, 3, +(array[dauTru - 1] - array[dauTru + 1]).toFixed(15));
				
			}
		}
		else{         // tra ket qua khi khong con gi de tinh
			i = array.length;  // ket thuc vong lap
			return array[0];
		}
	}
}


function binhPhuong(a){
	let b = a * a;
	if(bieuThuc.length == 1){
		screen.html(a + '<sup>2</sup> = ' + b);
		bieuThuc = [];
		toanHang[0] = b;
		$('.historyScreen').append(screen.html() + '<hr>');
	}
	else{
		bieuThuc.pop();
		screen.html(bieuThuc.join('') + b);
		toanHang[0] = b;
	}
}

function lapPhuong(a){
	let b = a * a * a;
	if(bieuThuc.length == 1){
		screen.html(a + '<sup>3</sup> = ' + b);
		bieuThuc = [];
		toanHang[0] = b;
		$('.historyScreen').append(screen.html() + '<hr>');

	}
	else{
		bieuThuc.pop();
		screen.html(bieuThuc.join('') + b);
		toanHang[0] = b;
	}
}


function canBacHai(a){
	let b = Math.sqrt(a);
	if(bieuThuc.length == 1){
		screen.html('&radic;' + a + ' = ' + b);
		bieuThuc = [];
		toanHang[0] = b;
		$('.historyScreen').append(screen.html() + '<hr>');

	}
	else{
		bieuThuc.pop();
		screen.html(bieuThuc.join('') + b);
		
		toanHang[0] = b;
	}
}


function giaiThua(){
	let n = bieuThuc[bieuThuc.length-1];
	let a = n;
	screen.empty();
	bieuThuc = [];
	if(!Number.isInteger(n) || (n < 0)){
		screen.html("Bạn phải nhập 1 số nguyên dương");
	}
	else if(n == 0){
		screen.html(n + "!" + " = 1");
		$('.historyScreen').append(screen.html() + '<hr>');

	}
	else{
		var i = 1;
		while(i<a){
			n*=(a-i);
			i++;
		}
		screen.html(a + "! = " + n);
		toanHang[0] = n;
		$('.historyScreen').append(screen.html() + '<hr>');

	}
}

function xoa(){
	screen.html(screen.html().slice(0, screen.html().length - 1));
	if(bieuThuc.length == 1 && bieuThuc[0] == toanHang[0]){
			let y = toanHang[0].toString();
			y = y.split('');
			y.pop();
			toanHang = y;
			bieuThuc = [];
	}

	else if(toanHang.length != 0){
		toanHang.pop();

	}
	
	else{
		if(bieuThuc.length == 0){
			return;
		}
		if(typeof bieuThuc[bieuThuc.length-1] == 'string' && typeof bieuThuc[bieuThuc.length-2] != 'string'){  //truong hop binh thuong
			let m;
			bieuThuc.pop();
			m = bieuThuc[bieuThuc.length-1].toString();
			m = m.split('');
			toanHang = m;
			bieuThuc.pop();
			}
		else if(typeof bieuThuc[bieuThuc.length-1] == 'string' && typeof bieuThuc[bieuThuc.length-2] == 'string'){
			bieuThuc.pop();
		}
		
	}
}

