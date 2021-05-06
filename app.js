$(document).ready(function () {
    let edit=false;
    console.log('jQuery Funciona');
    $('#task-result').hide();
    fetchtask();
    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            //console.log(search);
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {

                    let tasks = JSON.parse(response);
                    console.log(tasks);
                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                       ${task.name}
                       </li>`

                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            })
        }

    })
    $('#task-form').submit(function (e) {
        //console.log('submiting');
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id:$('#taskId').val()
        };//console.log(postData);
        let url = edit === false ? 'task-add.php':'task-edit.php';
console.log(url);
        //e.preventDefault();
        $.post(url, postData, function (response) {
            
            console.log(response);
            fetchtask();
            $('#task-form').trigger('reset');
        });
        e.preventDefault();
    });

    function fetchtask() {
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function (response) {
                let tasks = JSON.parse(response);
                let template = '';

                tasks.forEach(task => {
                    template += `<tr taskId="${task.id}">
    <td>${task.id}</td>
    <td><a href="#" class="task-item">${task.name}</a></td>
    <td>${task.description}</td>
    <td> <button class=" task-delete btn btn-danger"> Delete </button></td>
    
    </tr>`
                });
                $('#tasks').html(template);
                // console.log(response);
            }
        });
    }
    $(document).on('click', '.task-delete', function () {
        if (confirm('esta seguro de eliminar?')) {//console.log('clicked');
            let element = $(this)[0].parentElement.parentElement;
            let prueba = $(element).attr('taskId');
            console.log(prueba);
            $.post('task-delete.php', { prueba }, function (response) {
                console.log(response);
                fetchtask();
            });
        }


    })
    $(document).on('click', '.task-item', function () {
        //console.log('editing');
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        console.log(id);
        $.post('task-single.php', { id }, function (response) {
            //console.log(response);
           const task= JSON.parse(response);
           $('#name').val(task.name);
           $('#description').val(task.description);
           $('#taskId').val(task.id);
           edit=true;


        });

    });

});