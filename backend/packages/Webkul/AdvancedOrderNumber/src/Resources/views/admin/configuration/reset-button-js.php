<script>
        $(document).ready(function () {
            var query = '&channel=' + $('#channel-switcher').val();
            $('.reset-button').each(function() {
                var HREF = $(this).attr('href');
                $(this).attr('href', HREF + query);
            });
              //  var HREF = $('.reset-button').attr('href');
            //    $('.reset-button').attr('href', HREF + query);
           
        });
</script>