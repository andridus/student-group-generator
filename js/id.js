/* 

Author: Andrew Clarke

Random unique ID generator for use in a friend's research study.

*/

(function() {

    'use strict';

    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        charSetSize, charCount, idCount, generatedIds,

        initialize = function() {
            $('#char_set').val(charSet);
            $('#generate').click(buttonClicked).one('click', revealShuffle);
            $('#shuffle').click(shuffleClicked);
        },

        render = function() {
            $('#results').html(generatedIds.join('<br/>'));
        },

        buttonClicked = function() {
            charSet = $.trim($('#char_set').val());
            charSetSize = charSet.length;
            charCount = parseInt($('#char_count').val());
            idCount = parseInt($('#id_count').val());

            // field validation
            if (!charSet || !charCount || !idCount) {
                alert('Fill in all fields.');
                return;
            }

            // prevents infinite loop when generatedIds
            // could not be fully populated
            if (charCount * charSetSize < idCount) {
                alert('Not enough uniques available.');
                return;
            }

            generatedIds = [];
            while (generatedIds.length < idCount) {
                var id = generateRandomId();
                if ($.inArray(id, generatedIds) == -1) generatedIds.push(id);
            }

            render();
        },

        revealShuffle = function() {
            $('#shuffle').removeClass('hidden');
        },

        shuffleClicked = function() {
            generatedIds = shuffleArray(generatedIds);
            render();
        },

        generateRandomId = function() {
            var id = '';
            for (var i = 1; i <= charCount; i++) {
                var randPos = Math.floor(Math.random() * charSetSize);
                id += charSet[randPos];
            }
            return id;
        },

        // "inside-out" shuffle         
        shuffleArray = function(array) {
            var tmp, randomIndex, pointer = array.length;
            if (pointer) while (--pointer) {
                randomIndex = Math.floor(Math.random() * (pointer + 1));
                tmp = array[randomIndex];
                array[randomIndex] = array[pointer];
                array[pointer] = tmp;
            }
            return array;
        };

    initialize();

}());