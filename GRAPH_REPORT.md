# Graph Report - repo  (2026-10-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 24 nodes · 21 edges · 5 communities (4 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `469e79bf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ci.yml
- steps
- repos
- hooks

## God Nodes (most connected - your core abstractions)
1. `steps` - 4 edges
2. `repos` - 4 edges
3. `hooks` - 4 edges
4. `smoke` - 3 edges
5. `jobs` - 2 edges
6. `with` - 2 edges
7. `name` - 1 edges
8. `runs-on` - 1 edges
9. `run` - 1 edges
10. `uses` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (5 total, 1 thin omitted)

### Community 0 - "ci.yml"
Cohesion: 0.33
Nodes (5): jobs, smoke, name, runs-on, True

### Community 1 - "steps"
Cohesion: 0.40
Nodes (5): steps, run, uses, with, python-version

### Community 3 - "repos"
Cohesion: 0.50
Nodes (3): repos, repo, rev

### Community 4 - "hooks"
Cohesion: 0.50
Nodes (4): args, exclude, id, hooks

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `smoke` connect `ci.yml` to `steps`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Why does `steps` connect `steps` to `ci.yml`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._