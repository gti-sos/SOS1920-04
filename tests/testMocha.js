const app = require('../index'),
    chai = require('chai'), chaiHttp = require('chai-http'),
    expect = chai.expect //to solve error when using done(): “ReferenceError: expect is not defined”
    ;
chai.use(chaiHttp);
//chai.use(chaiSubset);
describe('Testing Website', function () {
    after(() => {});
    var url = 'https://sos1920-04.herokuapp.com/';
    var requester = chai.request.agent(url);//to keep the same session; without requester agent the get or post will act as opening a new window
    
    //When done is passed in, Mocha will wait until the call to done(), or until the timeout expires. done also accepts an error parameter when signaling completion.
    it('should get a confirmation code', function (done) { // <= Pass in done callback

        requester
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                console.log(res.body);
                done(); // <= Call done to signal callback end
            });
    });
});
