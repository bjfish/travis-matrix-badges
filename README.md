# Travis Matrix Build Badges

A small web server to produce a badge of the builds statuses in a Travis Matrix build.

## URL Format

Replace the following parameters
```
https://travis-matrix-badges.herokuapp.com/repos/${repo_owner}/${repo_name}/branches/${branch}
```

### Static Example

[![Build Status](http://i.imgur.com/4oSnGEd.png)](https://travis-ci.org/bjfish/grails-ci-build-matrix-example)

### Live Example

```
[![Build Status](https://travis-matrix-badges.herokuapp.com/repos/bjfish/grails-ci-build-matrix-example/branches/master)](https://travis-ci.org/bjfish/grails-ci-build-matrix-example)
```

[![Build Status](https://travis-matrix-badges.herokuapp.com/repos/bjfish/grails-ci-build-matrix-example/branches/master)](https://travis-ci.org/bjfish/grails-ci-build-matrix-example)

### Badge-Per-Job

Another option would be to specify a badge per job:
```
https://travis-matrix-badges.herokuapp.com/repos/${repo_owner}/${repo_name}/branches/${branch}/${job_number}
```

Live example:

| Build1            | Build2            | Build3            | Build4            |
|-------------------|-------------------|-------------------|-------------------|
| [![Build1][1]][5] | [![Build2][2]][5] | [![Build3][3]][5] | [![Build4][4]][5] |

[1]: https://travis-matrix-badges.herokuapp.com/repos/bjfish/grails-ci-build-matrix-example/branches/master/1
[2]: https://travis-matrix-badges.herokuapp.com/repos/bjfish/grails-ci-build-matrix-example/branches/master/2
[3]: https://travis-matrix-badges.herokuapp.com/repos/bjfish/grails-ci-build-matrix-example/branches/master/3
[4]: https://travis-matrix-badges.herokuapp.com/repos/bjfish/grails-ci-build-matrix-example/branches/master/4
[5]: https://travis-ci.org/bjfish/grails-ci-build-matrix-example

### Using with travis-ci.com

If you're using travis-ci.com for Open Source project, you can set the query
parameter `use_travis_com` to `true` to fetch the status from travis-ci.com
instead of travis-ci.org.

```
https://travis-matrix-badges.herokuapp.com/repos/${repo_owner}/${repo_name}/branches/${branch}?use_travis_com=true
```