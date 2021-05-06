describe('main.js', function() {
    describe('calculate()', function() {
        it('calls add', function() {
            const spy = spyOn(Calculator.prototype, 'add');
            calculate('1+3');

            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith(1);
            expect(spy).toHaveBeenCalledWith(3);
        });

        it('calls subtract', function() {
            const spy = spyOn(Calculator.prototype, 'subtract');
            calculate('7-3');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).not.toHaveBeenCalledWith(7);
            expect(spy).toHaveBeenCalledWith(3);
        });

        it('calls multiply', function() {
            const spy = spyOn(Calculator.prototype, 'multiply');
            calculate('2*5');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).not.toHaveBeenCalledWith(2);
            expect(spy).toHaveBeenCalledWith(5);
        });

        it('calls divide', function() {
            const spy = spyOn(Calculator.prototype, 'divide');
            calculate('9/3');

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).not.toHaveBeenCalledWith(9);
            expect(spy).toHaveBeenCalledWith(3);
        });

        it('validates expression when first number is invalid', function() {
            spyOn(window, 'updateResult').and.stub(); // and.stub() is the default, can be omitted

            calculate('a+3');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validates expression when second number is invalid', function() {
            spyOn(window, 'updateResult');

            calculate('3+a');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('validates expression when operation is invalid', function() {
            spyOn(window, 'updateResult');

            calculate('3_1');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Operation not recognized');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('calls updateResult (with callThrough)', function() {
            spyOn(window, 'updateResult');
            // let the real function execute
            spyOn(Calculator.prototype, 'multiply').and.callThrough();

            calculate('3*2');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith(6);
        });

        it('calls updateResult (with callFake)', function() {
            spyOn(window, 'updateResult');
            // use custom implementation instead of real function
            spyOn(Calculator.prototype, 'multiply').and.callFake(function(number) {
                return 'working'
            });

            calculate('3*2');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('working');
        });

        it('calls updateResult (with returnValue)', function() {
            spyOn(window, 'updateResult');
            // return value specified instad of executing real function
            spyOn(Calculator.prototype, 'multiply').and.returnValue('it works');

            calculate('3*2');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('it works');
        });

        it('calls updateResult (with returnValues)', function() {
            spyOn(window, 'updateResult');
            // return values specified instad of executing real function
            spyOn(Calculator.prototype, 'add').and.returnValues(null, 'result returned');

            calculate('3+2');

            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('result returned');
        });

        it('does not handle errors', function() {
            const spy = spyOn(Calculator.prototype, 'multiply').and.throwError('error');


            expect(function() { calculate('3*2') }).toThrowError('error');
        });
    });

    describe('updateResult()', function() {
        beforeAll(function() {
            const element = document.createElement('div');
            element.setAttribute('id', 'result');
            document.body.appendChild(element);

            // !!! using an arrow funtion changes the context, preventing this from
            // being available to the specs.
            this.element = element;
        });

        afterAll(function() {
            document.body.removeChild(this.element);
        });

        it('adds result to DOM element', function() {
            updateResult('5');

            expect(this.element.innerText).toBe('5');
        });
    });

    describe('showVersion()', function() {
        it('calls calculator.version', function() {
            spyOn(document, 'getElementById').and.returnValue({ innerText: null });
            const versionSpy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(Promise.resolve());

            showVersion();
            
            expect(versionSpy).toHaveBeenCalled();
        });
    });
});