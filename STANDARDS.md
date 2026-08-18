# JAYSYS STANDARDS


## STANDARD 001: ORGANIZE JAYSYS WORK BY PURPOSE
Builds go to projects
experiments go to labs
reusable assets go to toolkit
learning notes go to knowledge
inactvie work goes to archive

## STANDARD 002: OPEN THE COMPLETE PROJECT IN VS CODE
Open the project root in VS Code, not isolated projet files.
this esnures Vs code can see the fll strcuture, git repo, terminal context, and project config.

## STANDARD 003: TRUST ONLY INSPECTED PROJECT FOLDERS
Trust only the project folders that you created yourself or obtained from a source you have inspected

## STANDARD 004: RECORD CONFIRMED DECISIONS
Project documentation records confirmed decisions, not guesses presented as final facts

## STANDARD 005: INSPECT GIT BEFORE STAGING OR COMMITTING
Before staging or committing work, inspect the repository with git status...to prevent blindly committing files and helps you understand the state of the repo before chnaging its version history

## STANDARD 006: GIVE EVERY SUBSTANTIAL PROJECT A DEFINITION FILE
Every substantial Jaysys project begins with a root-level PROJECT.md that explains the project before implementation begins
PROJECT.md holds the specific project's identity, purpose, context, and confirmed decisions.

## STANDARD 007: KEEP REUSABLE STANDARDS INSIDE EVERY PROJECT
Every Jaysys project should contain a root-level STANDARDS.md file that records the reusable practices followed across Jaysys projects.

## STANDARD 008: LEARN COMMANDS ACROSS THREE ENVIRONMENTS

Every Bash command used during a JaySys project must include its equivalent implementation in PowerShell and Python, even for simple operations.

Bash remains the primary working environment unless another environment is explicitly selected. The PowerShell and Python implementations are provided to build contextual familiarity with all three environments without requiring separate learning projects.

Each implementation must explain the command's overall purpose and the meaning of its commands, arguments, options, operators, paths, special characters, and relevant syntax.

## STANDARD 009: VERIFY DEV TOOLS BEFORE USE

Before using an installed dev tool in a jaysys project, verify both the tool's version and the executable location being used by the active terminal.

## STANDARD 010: ISOLATE PYTHON PROJECT DEPENDENCIES

Every Jaysys project that uses python must have its own virtual enviroment inside the project root.
The virtual environment should be named .venv unless the project has a documented reason to use a different name.
Project dependencies must be installed inside the project’s virtual environment rather than into the computer’s global Python installation. The .venv directory must not be committed or pushed to GitHub because it contains generated and machine-specific files.

## STANDARD 011: GITIGNORE

Create and configure .gitignore before staging generated environments, dependencies,secrets,temp files, or machine-specific project content

## STANDARD 012: MAINTAIN A DAILY BUILD LOG FOR EVERY SESSION

Every active JaySys project must contain a root-level `build_log` directory that records the project's build sessions.

 
Each meaningful build session must have its own Markdown file using this naming pattern:
`001_build_log_DD-MM-YY.md`

The three-digit number records the chronological build-session sequence. The date records when the session occurred.

Each build log must document:
- the session goal;
- the work completed;
- important decisions made;
- new concepts or commands practised;
- problems encountered and how they were resolved;
- the condition of the project at the end of the session;
- the intended milestones for the next build session.
 
Build logs must describe actual work performed rather than presenting planned work as completed.