const API = 'https://firt-app.herokuapp.com/users';

let userId = 0; 
let rowId ;

let sortBy = "id";
let sortWay = 'desc';

// Load xong HTML mới chạy
$(function() {
  getUsers(1);
});

function creatUserRow(name,email,bio,phone,id){
    return `<tr>
    <td>
      <span class="custom-checkbox">
        <input
          type="checkbox"
          class="checkboxStudent"
          name="options[]"
          data-idStudent=${id}
        />
        <label for="checkbox1"></label>
      </span>
    </td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${bio}</td>
    <td>${phone}</td>
    <td>
      <a
        href="#editEmployeeModal"
        class="edit"
        data-toggle="modal"
        onclick="confirmEdit(${id},this)"
        ><i class="material-icons" data-toggle="tooltip" title="Edit"
          ></i
        ></a
      >
      <a
        href="#deleteEmployeeModal"
        class="delete"
        data-toggle="modal"
        onclick="confirmDelete(${id}, this)"
        ><i
          class="material-icons"
          data-toggle="tooltip"
          title="Delete"
          ></i
        ></a
      >
    </td>
  </tr>`
}

function creatPageList(total, page){
    let pageNumber = Math.ceil(total / 10);
    
    let add = `<li class="page-item " >
                    <a
                    href="#"
                    onclick = "previousPage(${page})"
                    >Previous</a
                    >
                </li>`;
    for(let i = 1; i <= pageNumber; i++){
        if( i == page){
            add += `<li class="page-item active">
                    <a
                    href="#"
                    class="page-link"
                    onclick = "getUsers(${i})")
                    >${i}</a
                    >
                </li>`;
                continue;
        }
        add += `<li class="page-item">
                    <a
                    href="#"
                    class="page-link"
                    onclick = "getUsers(${i})")
                    >${i}</a
                    >
                </li>`
    }
    add += `<li class="page-item">
                <a
                href="#"
                class="page-link"
                onclick = "nextPage(${page}, ${pageNumber})"
                >Next</a
                >
            </li>`;
    $("#addPages").html(add);
}

function nextPage(page, pageNumber){
    if(page == pageNumber) return;
    getUsers(page + 1);
}

function previousPage(page){
    if(page == 1) return;
    getUsers(page - 1);
}

function getUsers(page = 1) {
  // Lấy danh sách Users theo chiều ID giảm dần
  $.ajax({
    url: API + `?_sort=${sortBy}&_order=${sortWay}&_page=${page}&_limit=10`,
    method: 'get'
  }).done(function(result, status, request) {
    let content = ``;
    for (let student of result) {
      content += creatUserRow(student.name || '', student.email || '', student.bio || '', student.phone || '', student.id);
    }

    $('#table-content').html(content);
    creatPageList(request.getResponseHeader('x-Total-Count'), page);
  });
}

function addUser() {
  $.ajax({
    url: API,
    method: 'post',
    data: {
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      bio: $('#bio').val()
    }
  }).done(function(result) {
    $('#table-content').prepend(creatUserRow(result.name || '', result.email || '', result.bio || '', result.phone || '', result.id));
    $('#addEmployeeModal').modal('hide');
    $('#name').val('');
    $('#email').val('');
    $('#bio').val('');
    $('#phone').val('');
    $('#addUserSuccess').toast('show');
    // TODO: Thông báo thêm mới thành công dùng Toast
  });
}

function confirmDelete(id , me) {
  userId = id;
  rowId = me;
}

function deleteUser() {
  $.ajax({
    url: API + '/' + userId,
    method: 'delete'
  }).done(function(){
    $(rowId).parents('tr').remove();
    $('#deleteEmployeeModal').modal('hide');
    // TODO: Thông báo thêm mới thành công dùng Toast
  });
}


function confirmEdit(id, userRow){
    $('#nameEdit').val($(userRow).parents('td').prev().prev().prev().prev().text());
    $('#emailEdit').val($(userRow).parents('td').prev().prev().prev().text());
    $('#bioEdit').val($(userRow).parents('td').prev().prev().text());
    $('#phoneEdit').val($(userRow).parents('td').prev().text());

    userId = id;
    rowId = userRow;
    
}

function editUser(){
    $.ajax({
        url: API + '/' + userId,
        method: 'put',
        data: {
            name: $('#nameEdit').val(),
            email: $('#emailEdit').val(),
            phone: $('#phoneEdit').val(),
            bio: $('#bioEdit').val()
        }
    }).done(function(result){
        $(rowId).parents('tr').after(creatUserRow(result.name || '', result.email || '', result.bio || '', result.phone || '', result.id));
        $(rowId).parents('tr').remove();
        $('#editEmployeeModal').modal('hide');
    });
}

function sortByName(){
  if(sortWay == 'desc'){
    sortWay = 'asc';
  }else{
    sortWay = 'desc';
  }
    sortBy = 'name';
    getUsers();
}

function search(){
  let str = $('#search').val();
  $.ajax({
    url: API + `?q=${str}`,
    method: 'get'
  }).done(function(result) {
    let content = ``;
  
    for (let student of result) {
      content += creatUserRow(student.name || '', student.email || '', student.bio || '', student.phone || '', student.id);
    }

    $('#table-content').html(content);
  });
  
}

function deleteStudents(){
  $('.checkboxStudent:checked').each(function(){
    $.ajax({
          url: API + '/' + $(this).attr('data-idStudent'),
          method: 'delete'
        }).done(() => {
          $(this).parents('tr').remove();
          
        });
  });
  $('#multipleDelete').modal('hide');
  $('#selectAll').attr('checked', false)
}

$('#selectAll').change(function() {
    let isChecked = this.checked;
    $('.checkboxStudent').each(function(){
      this.checked = isChecked;
    });
});