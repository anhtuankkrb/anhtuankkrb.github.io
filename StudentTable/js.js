let studentList = [];
studentList.push(new Student("Hưng", "2001","hung@gmail.com","0123456789"));
studentList.push(new Student("Tuấn", "1995","tuan@gmail.com","0123456789"));
studentList.push(new Student("Khanh", "1996","khanh@gmail.com","0123456789"));
studentList.push(new Student("Tâm", "1996","tam@gmail.com","0123456789"));
studentList.push(new Student("Khánh", "1993","khanh@gmail.com","0123456789"));
createNewTable();

//Hàm tạo đối tượng học viên
function Student(name, birthYear, emali, phone){   
    this.name = name;
    this.birthYear = birthYear;
    this.emali = emali;
    this.phone = phone;
    this.control = '<span class="done" onclick="done(this)"><i class="fas fa-check-circle"></i> Xong</span>\
                    <span class="repair" onclick="repair(this)"><i class="fas fa-edit"></i> Sửa &nbsp;</span> \
                    | <span class="delete" onclick="deleteStudent(this)"><i class="fas fa-trash-alt"></i>Xóa</span>';

    this.createHtmlString = function(){
        return `<tr>
                    <td>${this.name}</td>
                    <td>${this.birthYear}</td>
                    <td>${this.emali}</td>
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
        $(item).empty().append(`<input type="text" value="${value}" />`)
    }
    $(me).hide();
    $(me).siblings('span[class="done"]').show();
}
function done(me){
    let info = $(me).parents("td").siblings();
    for(let item of info){
        let value = $(item).find("input").val();
        $(item).empty().append(value);
    }
    $(me).hide();
    $(me).siblings('span[class="repair"]').show();
    updateStudentList();
}

function sortByName(){
    sortTable("name");
}
function sortByYear(){
    sortTable("birthYear");
}


function createStudent(me){
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
            
            let info = $(this).parents("td").siblings();
            if($("input[placeholder='Họ tên']").val() != ""){
                for(let item of info){
                    let value = $(item).find("input").val();
                    $(item).empty().append(value);
                }           
                updateStudentList();
                $("#create").show();
                deleteTable();
                createNewTable();
            }else{
                $(this).parents("tr").remove();
                $("#create").show();
            }
        });
        $("#quit").click(function(){
            $(this).parents("tr").remove();
            $("#create").show();   
        });

    }

//Các hàm xử lý
function deleteTable(){
    $("#table tbody").empty();
}
function createNewTable(){
   studentList.forEach(function(obj){
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
    studentList.sort(function(a, b){
        a = a[by].toLowerCase();
        b = b[by].toLowerCase();
        if(a < b){
            return -1;
        }else if(a > b){
            return 1;
        }else{ return 0;
        }
        
    });
    deleteTable();
    createNewTable();
}




