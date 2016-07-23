document.addEventListener("DOMContentLoaded" ,function () {
    var wonderwomanPosition = {
        top: 0,
        left:0
    }
    var enemyPosition = {
        top: 0,
        left: 0
    }
    var isMovingRight = false;
    var isMovingLeft = false;
    var speed = 10;
    var enemyMovingright = false;
    var enemyMovingLeft = false;
    function wonderWomanMove() {

      if (isMovingRight && wonderwomanPosition.left < 800) {
            wonderwomanPosition.left += speed;
          }

          if (isMovingLeft && wonderwomanPosition.left >= 0) {
            wonderwomanPosition.left -= speed;
          }

          var mywonderwoman = document.getElementById('wonderwoman');
        mywonderwoman.style.left = wonderwomanPosition.left + 'px';
    }
    function enemyMove() {

       if (enemyPosition.left == 930) {
            enemyMovingright = false;
        }
        if (enemyPosition.left == 0) {
            enemyMovingright = true;
        }
        if (enemyMovingright == true) {
            enemyPosition.left += speed;
        } else {
            enemyPosition.left -= speed;
        }
        var myenemy = document.getElementById("enemy");
        myenemy.style.left = enemyPosition.left + 'px';
    }

    function gameLoop () {
        enemyMove();
        wonderWomanMove();
        shooting();
        requestAnimationFrame(gameLoop);
        count();


    }

    function createBullet() {
        if(score()){
            var box = document.getElementById('wonderwoman');
            var eternal = document.getElementById('bul');
            var newDiv = document.createElement("div");
            newDiv.classList.add('bullet');
            eternal.appendChild(newDiv);
            newDiv.style.left = box.style.left;
            newDiv.style.bottom = "36px";
        }
    }
    function shooting () {
        var mooving = document.getElementsByClassName('bullet');
        for (var i = 0; i < mooving.length; i++) {
            mooving[i].style.bottom = (parseInt(mooving[i].style.bottom)+10) + "px";
            if(parseInt(mooving[i].style.bottom) > 490){
                var tPosition = parseInt(document.getElementById("enemy").style.left);
                var bPosition = parseInt(mooving[i].style.left);
                if (bPosition>=tPosition && bPosition<=(tPosition+80)) {
                    var hitz = parseInt(document.getElementById("points").innerHTML);
                    hitz ++;
                    document.getElementById("points").innerHTML = hitz.toString();
                }
                mooving[i].parentNode.removeChild(mooving[i]);
            }
        }
    }
    function score () {
        var count = parseInt(document.getElementById('balls').innerHTML);
        if(count>0){
            count--;
            document.getElementById('balls').innerHTML = count.toString();
            return true;
        }
         return false;
    }


        requestAnimationFrame(gameLoop);

        function Count(){
          if ((count == 10) && (hitz > 0)){
            document.getElementById("win").style.visibility = "visible";
            return ;
          } else if((count < 10) && (hitz < 1)){
            document.getElementById("Gameover").style.visibility = "visible";
            return ;
          }
          return;
        }

    document.addEventListener('keydown', function (e) {
        if (e.keyCode == 39) {
            isMovingRight = true;
        }
        if (e.keyCode == 37) {
            isMovingLeft = true;
        }
        if (e.keyCode == 32) {
            createBullet();
        }
    }, false);
    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 39) {
            isMovingRight = false;
        }
        if (e.keyCode == 37) {
            isMovingLeft = false;
        }
    }, false);
},false);
