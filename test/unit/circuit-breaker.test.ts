import { expect } from 'chai';
import CircuitBreaker from 'opossum';
import CircuitBreakerManager from '../../src/common/lib/CircuitBreakerManager';

async function sleep(time: number): Promise<void>
{
    await new Promise(resolve => setTimeout(resolve, time));
}

function createCallback(time: number = 0): () => Promise<boolean>
{
    return async () => {
        await sleep(Number(process.env.CIRCUIT_BREAKER_TIMEOUT) + time);
        return true;
    };
}

function fallback(): boolean
{
    return false;
}

describe('Circuit breaker tests', () => {
    it('should register', () => {
        const circuit1 = CircuitBreakerManager.register('test0', createCallback(), fallback);
        const circuit2 = CircuitBreakerManager.get('test0');
        expect(circuit1).to.be.instanceOf(CircuitBreaker);
        expect(circuit1).to.be.equal(circuit2);
    });

    it('should remove', () => {
        CircuitBreakerManager.register('test1', createCallback(), fallback);
        CircuitBreakerManager.remove('test1');
        expect(CircuitBreakerManager.get('test1')).to.be.undefined;
    });

    it('should resolve', async () => {
        const circuit = CircuitBreakerManager.register('test2', createCallback(-100), fallback);
        const result = await circuit.fire();
        expect(result).to.be.true;
    });

    it('should reject', async () => {
        const circuit = CircuitBreakerManager.register('test3', createCallback(100), fallback);
        const result = await circuit.fire();
        expect(result).to.be.false;
    });

    it('should fallback', done => {
        const circuit = CircuitBreakerManager.register('test4', createCallback(100), () => {
            expect(true).to.be.true;
            done();
        });
        circuit.fire();
    });
});