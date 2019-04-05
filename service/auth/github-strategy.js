const {hostName,port} = require("../../host")

const GitHubStrategy = require("passport-github").Strategy
const models = require("../../models")

const options = {
    clientID: require("fs").readFileSync("./.github_cid", "utf8"),
    clientSecret: require("fs").readFileSync("./.github_secret", "utf8"),
    callbackURL: `http://${hostName}:${port}/api/auth/github/callback`
}

function verifier(accessToken, refreshToken, profile, cb) {
    const maybeNewUser = {
        providerId: profile.id,
        provider: profile.provider,
        username: profile.username,
        defaultCities: ["Roma", "Paris", "Minsk", "London"],
        spotlight: "Minsk"
    }

    models.User.findOneAndUpdate(
        { providerId: profile.id, provider: profile.provider },
        maybeNewUser,
        { new: true, upsert: true },
        (err, user) => {
            if (err) {
                console.error(`unable to create user for ${profile.username} from provider ${profile.provider}`)
            } else {
                console.info(`New(?) user ${user.username} from ${user.provider}`)
            }

            cb(err, user)
        }
    )
}

module.exports = new GitHubStrategy(options, verifier)