const express = require('express');
const router = express.Router();
const { db } = require('../firebaseConfig');

// Fetch all posts
router.get('/posts', async (req, res) => {
    try {
        const postsSnapshot = await db.collection('posts').orderBy('timestamp', 'desc').get();
        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a new post
router.post('/posts', async (req, res) => {
    const { authorPhone, content } = req.body;

    if (!authorPhone || !content.trim()) {
        return res.status(400).json({ message: 'Author and content are required' });
    }

    try {
        const userDoc = await db.collection('users').doc(authorPhone).get();
        if (!userDoc.exists) {
            return res.status(400).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        const newPost = {
            author: `${userData.first_name} ${userData.last_name}`,
            authorPhone,
            content: content.trim(),
            timestamp: new Date().toISOString(),
            comments: [],
        };

        const postRef = await db.collection('posts').add(newPost);
        res.status(201).json({ id: postRef.id, ...newPost });
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a comment to a post
router.post('/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { authorPhone, content } = req.body;

    if (!authorPhone || !content.trim()) {
        return res.status(400).json({ message: 'Author and content are required' });
    }

    try {
        const userDoc = await db.collection('users').doc(authorPhone).get();
        if (!userDoc.exists) {
            return res.status(400).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        const comment = {
            id: Date.now(),
            author: `${userData.first_name} ${userData.last_name}`,
            content: content.trim(),
            timestamp: new Date().toISOString(),
        };

        const postRef = db.collection('posts').doc(postId);
        const postDoc = await postRef.get();

        if (!postDoc.exists) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await postRef.update({
            comments: [...postDoc.data().comments, comment],
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
