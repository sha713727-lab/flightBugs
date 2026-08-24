Numbered, forward-only SQL migration files. Never edit after applied to a shared environment.

`0002_security_tables_hardening.sql` is irreversible: it replaces TEXT primary keys with UUID ids and adds timestamps/triggers. Rollback requires restoring from backup.

