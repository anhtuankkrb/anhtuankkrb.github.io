let studentList = [];
studentList.push(new Student("Hưng", "2001","hung@gmail.com","0123456789"));
studentList.push(new Student("Tuấn", "1995","tuan@gmail.com","0123456789"));
studentList.push(new Student("Khanh", "1996","khanh@gmail.com","0123456789"));
studentList.push(new Student("Tâm", "1996","tam@gmail.com","0123456789"));
studentList.push(new Student("Khánh", "1993","khanh@gmail.com","0123456789"));
createNewTable(studentList);
let currentRepair = [];
//Hàm tạo đối tượng học viên
function Student(name, birthYear, email, phone){   
    this.name = name;
    this.birthYear = birthYear;
    this.email = email;
    this.phone = phone;
    this.control = `<span class="done" onclick="done(this)"><i class="fas fa-check-circle"></i> Xong</span>\
                    <span class="repair" onclick="repair(this)"><i class="fas fa-edit"></i> Sửa &nbsp;</span> \
                    &nbsp; <span class="delete" onclick="deleteStudent(this)"><i class="fas fa-trash-alt"></i>Xóa</span>\
                    <span class="cance" onclick="cance(this)"><i class="fas fa-times-circle"></i> Bỏ</span>`;

    this.createHtmlString = function(){
        return `<tr>
                    <td>${this.name}</td>
                    <td>${this.birthYear}</td>
                    <td>${this.email}</td>
                    <td>${this.phone}</td>
                    <td>${this.control}</td>
                </tr>`
    }
   
}
// Các hàm sự kiện

function deleteStudent(me){
    let a = confirm("Bạn có muốn xóa học viên?")
    if(a){
    $(me).parents("tr").remove();
    updateStudentList();
    }
}
function repair(me){
    let info = $(me).parents("td").siblings();
    for(let item of info){
        let value = item.innerHTML;
        currentRepair.push(value);
        $(item).empty().append(`<input type="text" value="${value}" />`)
    }
    $(".repair").hide();
    $(me).siblings('span[class="done"]').show();
    $(".delete").hide();
    $("#create").hide();
    $(me).siblings(".cance").show();
}
function done(me){
    let info = $(me).parents("td").siblings();
    for(let item of info){
        let value = $(item).find("input").val();
        $(item).empty().append(value);
    }
    $(me).hide();      
    $(me).siblings(".cance").hide();
    $(".delete").show();
    $(".repair").show();
    $("#create").show();
    updateStudentList();
    currentRepair = [];
}
function cance(me){
    let info = $(me).parents("td").siblings();
    for(let i = 0; i < currentRepair.length; i++){
        $(info[i]).text(currentRepair[i]);
    }
    $(me).hide();       
    $(me).siblings(".done").hide();
    $(".delete").show();
    $(".repair").show();
    $("#create").show();
    updateStudentList();
    currentRepair = [];
}
function createStudent(me){
    $(".delete").hide();
    $(".repair").hide();
    $("#table tbody").append(
        `<tr>
            <td><input type="text" placeholder="Họ tên" /></td>
            <td><input type="text" placeholder="Năm sinh" /></td>
            <td><input type="text" placeholder="Email" /></td>
            <td><input type="text" placeholder="Số điện thoại" /></td>
            <td>
                <span id="add" style="display:inline"><i class="fas fa-plus"></i> Thêm</span> | 
                <span id="quit"><i class="fas fa-times-circle"></i> Bỏ</span>
            </td>
        </tr>`
    );
    $(me).hide();
    $("#add").click(function(){
        $(".delete").show();
        $(".repair").show();
        let info = $(this).parents("td").siblings();
        if($("input[placeholder='Họ tên']").val() != ""){
            for(let item of info){
                let value = $(item).find("input").val();
                $(item).empty().append(value);
            }           
            updateStudentList();
            $("#create").show();
            $(this).parent().empty().append(studentList[studentList.length - 1].control);

        
        }else{
            $(this).parents("tr").remove();
            $("#create").show();
        }
    });
    $("#quit").click(function(){
        $(".delete").show();
        $(".repair").show();
        $(this).parents("tr").remove();
        $("#create").show();   
    });

}

//Các hàm xử lý

function createNewTable(table){
    $("#table tbody").empty();
   table.forEach(function(obj){
        $(obj.createHtmlString()).appendTo("#table tbody")
   });
}

function updateStudentList(){
    studentList = [];
    let rows = $("#table tbody").find("tr");
    
    for(let i = 0; i <= rows.length-1; i++){
        let td = $(rows[i]).find("td");
        studentList.push( new Student($(td[0]).text(), $(td[1]).text(), $(td[2]).text(), $(td[3]).text()));
    }
}

function sortTable(by){
    
    let tester = false;
    for(let i = 0; i < studentList.length; i++){
        if(i + 1 == studentList.length){
            break;
        }
       if( !(studentList[i][by].toLowerCase() <= studentList[i + 1][by].toLowerCase()) ){
            tester = true;
            break;
       }

    }
    studentList.sort(function(a, b){       
        a = a[by].toLowerCase();
        b = b[by].toLowerCase();
        let c = tester ? a : b;
        let d = tester ? b : a;
        
        if(c < d){
            return -1;
        }else if(c > d){
            return 1;
        }else{ 
            return 0;
        }
        
    });
    createNewTable(studentList);
    $("#create").show();
}


function searchStudents(){
    let match = $("#search").val().toLowerCase();
    let result = [];
    studentList.forEach(function(obj){
        if(obj.name.toLowerCase().search(match) == 0){
            result.push(obj);
        }
        else if(obj.birthYear.search(match) == 0){
            result.push(obj);
        }
        else if(obj.email.search(match) == 0){
            result.push(obj);
        }else if(obj.phone.search(match) == 0){
            result.push(obj);
        }
    });
  return result;
}

function searchTable(){
    let test = $("#table tbody tr").find("input")
    if(test.length != 0){
        $(test).parents("tr").css("background", "#f68c8c");
        $("#warning").show();
        setTimeout(function(){
            $(test).parents("tr").css("background", "");
            $("#warning").hide();
        },2000);
        return ;
    }   
    let result =searchStudents();
       
    let tds = $("#table tbody td:first-child");
    $("#table tbody tr").hide();
    result.forEach(function(value){
        for(let i = 0; i < tds.length; i++){
            if($(tds[i]).text() == value.name &&
               $(tds[i]).next().text() == value.birthYear &&
               $(tds[i]).next().next().text() == value.email &&
               $(tds[i]).next().next().next().text() == value.phone ){
                $(tds[i]).parent().show();
            }
        }
    });
}

function findTable(){
    let result = searchStudents();
    $("#table tbody tr").css("background", "");
    if($("#search").val() == ""){
        $("#find").hide();
        $("#table tbody tr").css("background", "");
        return; 
    }
    $("#find").show();
    $("#find").text(`Tìm thấy ${result.length} học viên`);

    let tds = $("#table tbody td:first-child");
    result.forEach(function(value){
        for(let i = 0; i < tds.length; i++){
            if($(tds[i]).text() == value.name &&
               $(tds[i]).next().text() == value.birthYear &&
               $(tds[i]).next().next().text() == value.email &&
               $(tds[i]).next().next().next().text() == value.phone ){
                $(tds[i]).parent().css("background", "#efdc82");
            }
        }
    });

}