$(function () {
    init();


    function init() {
        eventBinding();
        initUserTable();
    }

    function eventBinding() {

        $('#addButton').on('click', function () {
            $('#addUser').modal('show');
        });

        $('#saveAdd').on('click', function () {
            var currUserName = $('#add_user_name').val();
            var currUserEmail = $('#add_user_email').val();
            var currUserPwd = $('#add_user_pwd').val();

            var data = {
                "user_name": currUserName,
                "user_email": currUserEmail,
                "user_pwd": currUserPwd
            };
            $.ajax({
                url: "users/add-user",
                data: data,
                method: "post",
                success: function (res) {
                    if (res.code === 0) {
                        $('#add_user_name').val('');
                        $('#add_user_email').val('');
                        $('#add_user_pwd').val('');
                        initUserTable();
                    } else {
                        console.log(res);
                    }
                    $('#addUser').modal('hide');
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });

        $('#saveEdit').on('click', function () {
            var currUserName = $('#edit_user_name').val();
            var currUserEmail = $('#edit_user_email').val();
            var currUserPwd = $('#edit_user_pwd').val();
            var currUserId = $('#edit_user_id').val();

            var data = {
                "user_id": currUserId,
                "user_name": currUserName,
                "user_email": currUserEmail,
                "user_pwd": currUserPwd
            };
            $.ajax({
                url: "users/update-user",
                data: data,
                method: "post",
                success: function (res) {
                    if (res.code === 0) {
                        $('#editUser').modal('hide');
                        initUserTable();
                    } else {
                        console.log(res);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });


    }

    function initUserTable() {
        $.ajax({
            method: 'get',
            data: '',
            url: "users/all-users",
            success: function (res) {
                if (res.code === 0) {
                    setUserTable(res.data);
                } else {
                    console.log(res);
                    setUserTable(new Array());
                }
                setUserTableOptions();
            },
            error: function (err) {
                console.log(err);
            }
        });
    }

    function setUserTable(data) {
        var dataTableOption = {
            dom: '<"top"<"pull-left"l><"pull-right"f>>rt<"bottom"<"pull-left"i><"pull-right"p>><"clear">',
            iDisplayLength: 10,
            bAutoWidth: false,
            responsive: true,
            bSort: true,
            bFilterOnEnter: true,
            paging: true,
            processing: false,
            bPaginate: true,
            sEmptyTable: "No data available in table"
        }
        dataTableOption.columns = [{
            "data": "user_name"
        }, {
            "data": "user_email"
        }, {
            "data": "user_pwd"
        }, {
            "data": "user_is_online"
        }, {
            width: '5%',
            render: function (data, type, full) {
                return '<span class="glyphicon glyphicon-pencil" aria-hidden="true" user_id = ' + full.user_id + '></span>';
            }
        }, {
            width: '5%',
            render: function (data, type, full) {
                return '<span class="rm_button glyphicon glyphicon-remove-sign" aria-hidden="true" user_id = ' + full.user_id + '></span>'
            }
        }];


        dataTableOption.data = data;
        $("#usersTable").DataTable().destroy();
        $("#usersTable").DataTable(dataTableOption)
    }

    function setUserTableOptions() {
        $('#usersTable tbody').on("click", "span.glyphicon-remove-sign", function () {
            var table = $('#usersTable').DataTable();
            table.row($(this).parents('tr')).remove().draw();
        });
        $('#usersTable tbody').on("click", "span.glyphicon-pencil", function () {
            var tdNodes = $(this).parents('tr').find('td');
            $('#edit_user_name').val($(tdNodes[0]).text());
            $('#edit_user_email').val($(tdNodes[1]).text());
            $('#edit_user_pwd').val($(tdNodes[2]).text());
            $('#edit_user_id').val($(this).attr('user_id'));
            $('#editUser').modal('show');
        });
        $('.rm_button').on('click', function () {
            var currUserId = $(this).attr('user_id');

            var data = {
                "id": currUserId
            };
            $.ajax({
                url: "users/remove-user",
                data: data,
                method: "post",
                success: function (res) {
                    if (res.code === 0) {
                        initUserTable();
                    } else {
                        console.log(res);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    }

});
