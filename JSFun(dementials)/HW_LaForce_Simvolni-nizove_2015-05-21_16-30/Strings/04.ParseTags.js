//### Problem 4. Parse tags
//*	You are given a text. Write a function that changes the text in all regions:
//    <upcase>text</upcase> to uppercase.
//<lowcase>text</lowcase> to lowercase
//<mixcase>text</mixcase> to mix casing(random)
//_Example:_ We are `<mixcase>living</mixcase>` in a `<upcase>yellow submarine</upcase>`. We `<mixcase>don't</mixcase>` have `<lowcase>anything</lowcase>` else.
//_The expected result:_
//We are LiVinG in a YELLOW SUBMARINE. We dOn'T have anything else.
//_Note: Regions can be nested._


var text = 'We are <mixcase>living</mixcase> in a <upcase>yellow submarine</upcase>. ' +
    'We <mixcase>don\'t</mixcase> have <lowcase>anYTHing</lowcase> else.';

console.log(text);
text = replaceTags(text);
text = parseTags(text);
console.log(text);

function replaceTags(text){
    text = text.replace(/<\s*upcase\s*>/gi, '<U>');
    text = text.replace(/<\s*\/upcase\s*>/gi, '</U>');
    text = text.replace(/<\s*lowcase\s*>/gi, '<L>');
    text = text.replace(/<\s*\/lowcase\s*>/gi, '</L>');
    text = text.replace(/<\s*mixcase\s*>/gi, '<M>');
    text = text.replace(/<\s*\/mixcase\s*>/gi, '</M>');

    return text;
}

function parseTags(text){
    var result = [];
    var inputArr = text.split('');
    var tags = [];
    var inTag= false;
    var inClosingTag = false;

    for(var ind = 0; ind < inputArr.length; ind++){
        if(inputArr[ind] === '<'){
            inTag = true;
            continue;
        }

        if(inputArr[ind] === '/' && inTag){
            inClosingTag = true;
            continue;
        }

        if(inTag && !inClosingTag && inputArr[ind].match(/[a-z]/i)){
            tags.push(inputArr[ind]);
            continue;
        }

        if(inputArr[ind] === '>'){
            if(inClosingTag){
                tags.pop();
                inClosingTag = false;
            }
            inTag = false;
            continue;
        }

        if(!inTag){
            if(!tags.length){
                result.push(inputArr[ind]);
            }
            else{
                switch (tags[0]){
                    case 'L':
                        result.push(inputArr[ind].toLowerCase());
                        break;
                    case 'U':
                        result.push(inputArr[ind].toUpperCase());
                        break;
                    case 'M':
                        if(!Math.round(Math.random())){
                            result.push(inputArr[ind].toLowerCase());
                        }
                        else{
                            result.push(inputArr[ind].toUpperCase());
                        }
                        break;
                }
            }
        }
    }

    return result.join('');
}