var weekend = false;
var sunny = true;
var money = true;

var projectType = {
    disneyland: 'disneyland',
    park: 'park',
    movie: 'movie',
    party: 'party',
    friends: 'friends'
};

if(weekend) {
    if(sunny) {
        if(money) {
            project(projectType.disneyland);
        }
        else {
            project(projectType.park);
        }
    }
    else {
        if(money) {
            project(projectType.party);
        }
        else {
            project(projectType.friends);
        }
    }
}
else {
    if(sunny) {
        if(money) {
            project(projectType.movie);
        }
        else {
            project(projectType.park);
        }
    }
    else {
        if(money) {
            project(projectType.movie);
        }
        else {

        }
    }
}

function project(target) {
    console.log(target);
}
