# Sanity Token Generator for DinoRPG

To allow other team members to use the DinoRPG game, they'll need their own Sanity API tokens. Follow these steps:

8. Copy the token:  VITE_SANITY_TOKEN=

9. Create a `.env` file in the `frontend` directory with this content:
```env
VITE_SANITY_TOKEN=your_token_here
```

**Important Notes:**
- Never commit your `.env` file to git
- Keep your token private and secure
- Each team member should have their own token
- If you need to revoke a token, you can do so from the Sanity management console

## Troubleshooting

If you get authentication errors:
1. Check that your `.env` file is in the correct location (frontend folder)
2. Make sure the variable name is exactly `VITE_SANITY_TOKEN`
3. Restart the development server after adding the token
4. Verify the token has the correct permissions in Sanity management console 