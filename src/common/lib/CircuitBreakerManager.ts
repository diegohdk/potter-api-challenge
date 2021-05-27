import CircuitBreaker from 'opossum';
import log from '../utils/log';

const CIRCUITS: Map<string, CircuitBreaker> = new Map;
const options: CircuitBreaker.Options = {
    errorThresholdPercentage : Number(process.env.CIRCUIT_BREAKER_THRESHOLD),
    timeout : Number(process.env.CIRCUIT_BREAKER_TIMEOUT),
    resetTimeout : Number(process.env.CIRCUIT_BREAKER_RESET_TIMEOUT)
};

/**
 * Circuit breaker manager.
 */
export default class CircuitBreakerManager
{
    static get(name: string): CircuitBreaker<any[], any>
    {
        return CIRCUITS.get(name);
    }

    static register(
        name: string,
        fn: (...args: any[]) => Promise<any>,
        fallback: CircuitBreaker<any[], any> | ((...args: any[]) => any)
    ): CircuitBreaker<any[], any>
    {
        const circuit = new CircuitBreaker(fn, options);

        circuit.fallback(fallback);
        circuit.on('open', () => log(`Circuit ${name} opened`));
        circuit.on('halfOpen', () => log(`Circuit ${name} half-opened`));
        circuit.on('close', () => log(`Circuit ${name} closed`));
        CIRCUITS.set(name, circuit);

        return circuit;
    }

    static remove(name: string): void
    {
        if (CIRCUITS.has(name)) {
            CIRCUITS.get(name).shutdown();
            CIRCUITS.delete(name);
        }
    }
}