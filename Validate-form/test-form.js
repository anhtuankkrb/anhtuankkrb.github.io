$("#testForm").on("submit", function(){
    let tester = true;
    
    if($("#name").val().trim() == ""){
        tester = false;
        $("#name+.tooltit").text("Bạn chưa nhập tên").show();
    }
    
    
    if($("#password").val() == ""){
        tester = false;
        $("#password+.tooltit").text("Bạn chưa nhập password").show();
    }else if($("#password").val().match(/\s/) != null){
        tester = false;
        $("#password+.tooltit").text("Password không được chứa khoảng trắng").show();
    }else if($("#password").val().length < 5 || $("#password").val().length > 15){
        tester = false;
        $("#password+.tooltit").text("Password phải từ 5 đến 15 ký tự").show();
    }
    
    if($("#passwordTest").val() !== $("#password").val()){
        tester = false;
        $("#passwordTest+.tooltit").text("Password không khớp").show();
    }
    
    if($("#email").val().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/) == null){
        tester = false;
        $("#email+.tooltit").text("Email không hợp lệ").show();
    }

    if(!Number.isInteger(+$("#telephone").val()) || $("#telephone").val().indexOf(".") != -1 ){
        tester = false;
        $("#telephone+.tooltit").text("Số điện thoại không hợp lệ").show();
    }else if($("#telephone").val().length != 10){
        tester = false;
        $("#telephone+.tooltit").text("Phải chứa 10 chữ số").show();
    }

    if($("#address").val().trim() == ""){
        tester = false;
        $("#address+.tooltit").text("Bạn chưa nhập địa chỉ").show();
    }

    if($("input:radio[name='gender']:checked").length == 0){
        tester = false;
        $(".gender .tooltit").text("Bạn chưa chọn giới tính").show();
    }

    return tester;
});

$("input").on("focus", function(){
    $(this).next(".tooltit").hide();
});
$("input:radio[name='gender']").change(function(){
    $(".gender .tooltit").hide();
});