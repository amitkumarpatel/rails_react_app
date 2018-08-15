// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require react
//= require react_ujs
//= require components
//= require_tree .


$(document).ready(function(){
    $(".kb-tab li a.bord-ttl" ).click(function() {
        $('.kb-task-edit  ul').hide();
        $('.add-task-layer').hide();
        $(".kb-adm").show("fast");
        $(".kb-tab-list").slideToggle("fast");
        $(this).parent().toggleClass("act");
    });

    if ( $(".kb-tab-list").css('visibility') === 'hidden') {
        $(".kb-tab li a.bord-ttl" ).hover(function() {
            $(".kb-adm").show();
        }, function(){$(".kb-adm").hide();});
    }

    $(".kb-handle").click(function(){
        $(this).hide();
        $(this).next(".kb-edit-handle").show();
    });

    $( "#notice_mssg" ).fadeIn( "slow", function() {
        // Animation complete
    });
});

/*
 $(function() {
 $( ".kb-task-box" ).sortable({
 connectWith: ".kb-task-box",
 placeholder: 'taskplaceholder',
 forcePlaceholderSize: true,
 tolerance: "intersect"
 }).disableSelection();

 $( ".kb-section" ).sortable({
 items:".kb-section-col",
 handle: '>.kb-handle',
 placeholder: 'placeholderBackground',
 forcePlaceholderSize: true,
 tolerance: "intersect"
 }).disableSelection();
 });*/

function setWidth(){
    var item_num = $(".kb-section .kb-section-col").length;
    var box_width_load = (item_num*275)+60+"px";
    $( ".kb-section" ).css({"width":box_width_load});
}

function boardwdthandDatepicker() {
    setWidth()
    var sectionid = $('#section_id_val').html()
    var startDateTextBox = $('#frm_date'+sectionid);
    var endDateTextBox = $('#to_date'+sectionid);
    startDateTextBox.datetimepicker({
        showOn: 'both',
        buttonImage: '/assets/calendar.png',
        buttonText: '',
        buttonImageOnly: true,
        showButtonPanel: false,
        numberOfMonths: 1,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'MM d, yy',
        showHour: false,
        showMinute: false,
        onClose: function(dateText, inst) {
            if (endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datetimepicker('setDate', testStartDate);
            }
            else {
                endDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime){
            endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
        }
    });
    endDateTextBox.datetimepicker({
        numberOfMonths: 1,
        showOn: 'both',
        buttonImage: '/assets/calendar.png',
        buttonText: '',
        buttonImageOnly: true,
        showButtonPanel: false,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'MM d, yy',
        showHour: false,
        showMinute: false,
        timeFormat: 'hh:mm',
        //controlType: 'select',
        onClose: function(dateText, inst) {
            if (startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datetimepicker('setDate', testEndDate);
            }
            else {
                startDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime){
            startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate') );
        }
    });
}
