### Gas Optimization

-   `constant` variable is swapped with the corresponding value
-   local variables are not stored in storage
-   array size is stored in the storage

> 0x54 SLOAD Load word from storage - 800

> 0x55 SSTORE Save word to storage - 20000\*\*

-   mapping cannot be in memory

-   for private variables provide API endpoints for testing
