import * as authServices from "../services/auth.js";


const setupSession = (res, session) => {
        res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });
};

export const registerController = async (req, res) => {
    const user = await authServices.register(req.body);

    const { _id, name, email, createdAt, updatedAt } = user.toObject();

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: { _id, name, email, createdAt, updatedAt },
    });
};

export const sendResetEmailController = async (req, res) => {
    await authServices.sendResetToken(req.body.email);

    res.json({
        status: 200,
        message: "Reset password email has been successfully sent.",
        data: {}
    });
};

export const resetPasswordController = async (req, res) => {
    await authServices.resetPassword(req.body);
    res.status(200).json({
        status: 200,
        message: "Password has been successfully reset.",
        data: {},
    });
};

export const loginController = async (req, res) => {
    const session = await authServices.login(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        },
    });
};


export const refreshTokenController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const session = await authServices.refreshToken({ refreshToken, sessionId });

    setupSession(res, session);

        res.json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const logoutController = async (req, res) => {
    if (req.cookies.sessionId) {
        await authServices.logout(req.cookies.sessionId);
    };

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    res.status(204).send();
};
