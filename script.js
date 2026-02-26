$(document).ready(function () {
    
    var table = $('#tabela').DataTable({
        pageLength: 5,
        dom: 'lfrtip',
        buttons: [
            {
                extend: 'csvHtml5',
                title: 'Kontakty',
                exportOptions: { columns: [0,1,2,3,4] }
            },
            {
                extend: 'pdfHtml5',
                title: 'Kontakty',
                exportOptions: { columns: [0,1,2,3,4] }
            }
        ]
    });

    $('#btnToggleForm').click(function () {

        $('#formContainer').slideToggle(300);
        if ($('#formContainer').is(':visible')) {
            $(this).text("Ukryj formularz");
        } else {
            $(this).text("Dodaj kontakt");
        }
    });
    

    $('#btnColor').click(function () {
        var color = $("#color").val();
        $('#tabela').css("background-color", color);
    });

    $('#tabela tbody').on('mouseenter', 'tr', function () {
        $(this).addClass("colored");
    }).on('mouseleave', 'tr', function () {
        $(this).removeClass("colored");
    });

    $('#tabela tbody').on('click', '.delete', function () {
        table.row($(this).parents('tr')).remove().draw();
    });

    $('#exportCSV').click(function () {
        table.button('.buttons-csv').trigger();
    });
    
    $('#exportPDF').click(function () {
        table.button('.buttons-pdf').trigger();
    });

    $('#contactForm').validate({
        rules: {
            imie: { required: true, minlength: 2 },
            nazwisko: { required: true, minlength: 2 },
            email: { required: true, email: true },
            telefon: { required: true, minlength: 9 }
        },
        messages: {
            imie: "Podaj imię",
            nazwisko: "Podaj nazwisko",
            email: "Podaj poprawny email",
            telefon: "Podaj numer telefonu"
        },
        submitHandler: function (form, event) {

            event.preventDefault();

            var imie = $("input[name='imie']").val();
            var nazwisko = $("input[name='nazwisko']").val();
            var email = $("input[name='email']").val();
            var firma = $("input[name='firma']").val();
            var telefon = $("input[name='telefon']").val();

            table.row.add([
                email,
                imie,
                nazwisko,
                firma,
                telefon,
                "<button class='delete btn btn-danger btn-sm'>Usuń</button>"
            ]).draw();

            $('#formContainer').fadeOut(300).fadeIn(300);

            $("#tabela").animate({
                opacity: 0.5
            }, 200).animate({
                opacity: 1
            }, 200);

            form.reset();
            $("h5").html("Kontakt został dodany pomyślnie");

            return false;
        }
    });
    $('#loadJson').click(function () {
        $.getJSON("contacts.json", function (data) {
            table.clear();
            $.each(data, function (index, contact) {
                table.row.add([
                    contact.email,
                    contact.imie,
                    contact.nazwisko,
                    contact.firma,
                    contact.telefon,
                    "<button class='delete btn btn-danger btn-sm'>Usuń</button>"
                ]);
    
            });
            table.draw();
            $('#tabela').hide().fadeIn(500);
        }).fail(function () {
            alert("Nie wczytano danych z pliku");
        });
    
    });
    

});
