let studentList = [];
studentList.push(new Student("Hưng", "2001","hung@gmail.com",0123456789));
studentList.push(new Student("Tuấn", "1995","tuan@gmail.com",0123456789));
studentList.push(new Student("Khanh", "1996","khanh@gmail.com",0123456789));
studentList.push(new Student("Tâm", "1996","tam@gmail.com",0123456789));
studentList.push(new Student("Khánh", "1993","khanh@gmail.com",0123456789));
createNewTable();
$(".xoa").click(function(){
    let a = confirm("Bạn có muốn xóa học viên ?")
    if(a){
    $(this).parents("tr").remove();
    updateStudentList();
    }
});
$(".sua").click(function(){
    let info = $(this).parents("td").siblings();
    for(let item of info){
        let value = item.innerHTML;
        $(item).empty().append(`<input type="text" value="${value}" />`)
    }
    $(this).hide();
    $(this).siblings('span[class="ok"]').show();
});
$(".ok").click(function(){
    let info = $(this).parents("td").siblings();
    for(let item of info){
        let value = $(item).find("input").val();
        $(item).empty().append(value);
    }
    $(this).hide();
    $(this).siblings('span[class="sua"]').show();
});

$("#sortByName").click(function(){
    sortTable("name");
});
$("#sortByYear").click(function(){
    sortTable("birthYear");
});



function Student(name, birthYear, emali, phone){
    this.name = name;
    this.birthYear = birthYear;
    this.emali = emali;
    this.phone = phone;
    this.control = '<span class="ok"><i class="fas fa-check-circle"></i> Xong</span><span class="sua"><i class="fas fa-edit"></i>Chỉnh sửa</span> | <span class="xoa"><i class="fas fa-trash-alt"></i>Xóa</span>';

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
function updateStudentList(){
    studentList = [];
    let rows = $("#table").find("tr");
    for(let i = 1; i <= rows.length-1; i++){
        let td = $(rows[i]).find("td");
        studentList.push( new Student(td[0].innerHTML, td[1].innerHTML, td[2].innerHTML, td[3].innerHTML));
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


function deleteTable(){
    $("#table tbody").empty();
}
function createNewTable(){
   studentList.forEach(function(obj){
        $(obj.createHtmlString()).appendTo("#table tbody")
   });
}

