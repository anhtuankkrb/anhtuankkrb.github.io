let quizList = [];
let quizAmount = 0;
let count;

function Quiz(question, result, answerArray){
    this.question = question;
    this.result = result;
    this.answer = answerArray;
    this.showQuestion = function(address){
        $(address).text(this.question);
    };
    this.showAnswer = function(address){
        let result = "";
        this.answer.sort(function(a, b){return 0.5 - Math.random()});
        this.answer.forEach(function(value){
            result += `<div>${value}</div>`;
        });
        $(address).html(result);
    };
}
function countScores(){
    let scores = 0;
    function count(){return ++scores}
    return count;
}
function createMyQuiz(){
    quizList.push(new Quiz("Anh trai của cháu gái gọi bạn bằng cô là gì của bạn?",
                            "Cháu",
                            ["Cháu", "Anh", "Chú", "Bác"]));
    quizList.push(new Quiz("Làm cách nào để có thể vừa đánh răng, vừa huýt sáo?",
                            "Tháo răng ra",
                            ["Bó tay", "Tháo răng ra", "Tập luyện", "Ngậm còi"]));
    quizList.push(new Quiz("Trong truyện Phong Thần Ngọc Đỉnh chân nhân là đệ tử của ai?",
                            "Nguyên Thủy Thiên Tôn",
                            ["Thái Ất Chân Nhân", "Nguyên Thủy Thiên Tôn", "Tiếp Dẫn Đạo Sư", "Thông Thiên Giáo Chủ"]));
    quizList.push(new Quiz("Một số tháng trong năm có ngày 31. Vậy bao nhiêu tháng có ngày 28?",
                            "12",
                            ["6", "1", "4 năm 1 tháng", "12"]));   
    quizList.push(new Quiz("Số thứ tự của quẻ Phong Lôi Hằng trong Kinh Dịch?",
                            "32",
                            ["32", "30", "1", "64"])); 
    quizList.push(new Quiz("Cái gì chỉ thuộc về bạn nhưng lại được người khác sử dụng nhiều hơn bạn?",
                            "Tên của bạn",
                            ["Tên của bạn", "Nhà của bạn", "Đèn nhà bạn", "Xe của bạn"])); 
    quizList.push(new Quiz("Nơi nào con trai có thể sinh con?",
                            "Dưới nước",
                            ["Gặp trưởng khoa sản", "Dưới nước", "Thái Lan", "Lên trời"]));      
}

function startQuiz(){
    $("#progress").show();
    $("#tableQuestion").css("display", "flex");
    $("#choose").css("display", "flex");
    count = countScores();
    createMyQuiz();
    quizList.sort(function(a, b){return 0.5 - Math.random()});
    quizAmount = quizList.length;
    showQuiz();
}

function runProgress(){
    let run = $("#runProgress");
    run.stop();
    run.animate({width: '0%'},0);
    run.animate({width: '100%'},10000);
}


function showQuiz(){ 
       
    let quiz = getQuiz();   
    quiz.showQuestion("#tableQuestion");
    quiz.showAnswer("#choose");
    runProgress();
    
    let end = setTimeout(function(){
        nextQuiz();
    },10000);
    $("#choose div").click(function(){
        document.getElementById("clickSound").play();
        clearTimeout(end);
        if($(this).text() == quiz.result){
            nextQuiz(true);
            return;
        }
        nextQuiz();
    });
}
function getQuiz(){
    return quizList.pop();
}

function nextQuiz(feedback){
    
    if(feedback == true){
        scores = count();
    }
    if(quizList.length == 0){
        endQuiz();
        return;
    }
    showQuiz();
}

function endQuiz(){
    let scores = count() - 1;
    if(scores == quizAmount){
        let url = location.href;
        url = url.replace("index.html", "");
        url += "win.html"
        location.assign(url);
    }else{
        result(scores);
    }
}

function result(scores){
    $("#progress").hide();
    $("#tableQuestion").hide();
    $("#choose").hide();
    $("#avata").fadeIn(1000);
    $("#result").text(`Kết quả: ${scores}/${quizAmount}`).fadeIn(1000);
    $("#replay").fadeIn(1000);
}

$("#start").click(function(){
    document.getElementById("clickSound").play();
    $("#selectAvata").slideUp(700);
    document.getElementById("music").play();
    $("#avata").fadeOut(1000);
    $(this).fadeOut(1000);
    $("#ready").fadeIn(0,function(){
       let time = setInterval(function(){
            if($("#ready").html() == 3){
                $("#ready").html("");
                $("#ready").hide();
                $("h1").hide();
                startQuiz();
                clearInterval(time);
                document.getElementById("tickSound").pause();
                return;
            }
            document.getElementById("tickSound").play();
            $("#ready").text(+($("#ready").html()) + 1);
       },1000);
        
    });
});

$("#replay").click(function(){
    document.getElementById("clickSound").play();
    $("#selectAvata").slideUp(700);
    $("h1").slideDown(1000);
    $("#result").hide();
    $(this).hide();
    $("#start").fadeIn(1000);
});

$("#selectAvata img").click(function(){
    $("#avata").attr("src", $(this).attr("src"));
    $("#selectAvata").slideUp(700);
});
$("#avata").click(function(){
    $("#selectAvata").slideToggle(700);
});