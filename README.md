# Deterministic finite automaton

![techs](https://img.shields.io/badge/techs-JavaScript-yellow)

In the theory of computation, a branch of theoretical computer science, a deterministic finite automaton (DFA)—also known as deterministic finite acceptor (DFA), deterministic finite-state machine (DFSM), or deterministic finite-state automaton (DFSA)—is a finite-state machine that accepts or rejects a given string of symbols, by running through a state sequence uniquely determined by the string.[1] Deterministic refers to the uniqueness of the computation run. In search of the simplest models to capture finite-state machines, Warren McCulloch and Walter Pitts were among the first researchers to introduce a concept similar to finite automata in 1943.[2][3]

The figure illustrates a deterministic finite automaton using a state diagram. In this example automaton, there are three states: S0, S1, and S2 (denoted graphically by circles). The automaton takes a finite sequence of 0s and 1s as input. For each state, there is a transition arrow leading out to a next state for both 0 and 1. Upon reading a symbol, a DFA jumps deterministically from one state to another by following the transition arrow. For example, if the automaton is currently in state S0 and the current input symbol is 1, then it deterministically jumps to state S1. A DFA has a start state (denoted graphically by an arrow coming in from nowhere) where computations begin, and a set of accept states (denoted graphically by a double circle) which help define when a computation is successful.

A DFA is defined as an abstract mathematical concept, but is often implemented in hardware and software for solving various specific problems. For example, a DFA can model software that decides whether or not online user input such as email addresses are valid.[4]

DFAs recognize exactly the set of regular languages,[1] which are, among other things, useful for doing lexical analysis and pattern matching. DFAs can be built from nondeterministic finite automata (NFAs) using the powerset construction method.

## Use Storie

- [x] User can set a number for represents the number of states
- [x] User can set the alphabet
- [x] User can set the initial state
- [x] User can set the finals states
- [x] User can set transitions
- [x] User can test a word for the defined authomaton
